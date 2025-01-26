'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Product {
  id: string;
  name: string;
  slug: string;
  base_price: number;
  description: string;
  short_description: string;
  meta_title: string;
  meta_description: string;
  is_featured: boolean;
}

export interface CustomizationOption {
  id: string;
  category: string;
  name: string;
  price_modifier: number;
  image_url: string;
  is_available: boolean;
  sort_order: number;
}

export interface PhoneModel {
  id: string;
  brand: string;
  model: string;
  image_url: string;
  is_available: boolean;
  sort_order: number;
}

export function useProducts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [customizationOptions, setCustomizationOptions] = useState<{
    [key: string]: CustomizationOption[];
  }>({});
  const [phoneModels, setPhoneModels] = useState<PhoneModel[]>([]);

  // Charger tous les produits
  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data);
    } catch (err) {
      setError('Erreur lors du chargement des produits');
      console.error(err);
    }
  };

  // Charger les options de personnalisation
  const loadCustomizationOptions = async () => {
    try {
      const { data, error } = await supabase
        .from('customization_options')
        .select('*')
        .order('sort_order');

      if (error) throw error;

      // Grouper les options par catégorie
      const grouped = data.reduce((acc, option) => {
        if (!acc[option.category]) {
          acc[option.category] = [];
        }
        acc[option.category].push(option);
        return acc;
      }, {});

      setCustomizationOptions(grouped);
    } catch (err) {
      setError('Erreur lors du chargement des options');
      console.error(err);
    }
  };

  // Charger les modèles de téléphone
  const loadPhoneModels = async () => {
    try {
      const { data, error } = await supabase
        .from('phone_models')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      setPhoneModels(data);
    } catch (err) {
      setError('Erreur lors du chargement des modèles');
      console.error(err);
    }
  };

  // Calculer le prix total avec les options
  const calculateTotalPrice = (basePrice: number, selectedOptions: CustomizationOption[]) => {
    return selectedOptions.reduce(
      (total, option) => total + (option?.price_modifier || 0),
      basePrice
    );
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([
        loadProducts(),
        loadCustomizationOptions(),
        loadPhoneModels()
      ]);
      setLoading(false);
    };

    loadAll();
  }, []);

  return {
    products,
    customizationOptions,
    phoneModels,
    loading,
    error,
    calculateTotalPrice,
    loadProducts,
    loadCustomizationOptions,
    loadPhoneModels
  };
} 