export type Plan = 'free' | 'paid' | 'premium';
export type AppStatus = 'trial' | 'active' | 'expired';
export type AppCategory = 'vitrine' | 'portfolio' | 'evenement' | 'restaurant' | 'cv' | 'landing' | 'autre';
export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due';

export interface Profile {
  id: string;
  email: string;
  phone: string | null;
  plan: Plan;
  stripe_customer_id: string | null;
  created_at: string;
}

export interface App {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  description: string;
  category: AppCategory | null;
  color_primary: string;
  color_secondary: string;
  logo_url: string | null;
  generated_code: string | null;
  status: AppStatus;
  created_at: string;
  expires_at: string | null;
}

export interface Subscription {
  id: string;
  user_id: string;
  app_id: string;
  stripe_subscription_id: string;
  status: SubscriptionStatus;
  created_at: string;
}

export interface CreateAppInput {
  name: string;
  slug: string;
  description: string;
  category?: AppCategory;
  color_primary: string;
  color_secondary: string;
  logo?: File;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
        Relationships: [];
      };
      apps: {
        Row: App;
        Insert: Omit<App, 'id' | 'created_at' | 'expires_at' | 'generated_code' | 'status'> & {
          generated_code?: string;
          status?: AppStatus;
        };
        Update: Partial<Omit<App, 'id' | 'created_at'>>;
        Relationships: [];
      };
      subscriptions: {
        Row: Subscription;
        Insert: Omit<Subscription, 'id' | 'created_at' | 'status'>;
        Update: Partial<Omit<Subscription, 'id' | 'created_at'>>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
