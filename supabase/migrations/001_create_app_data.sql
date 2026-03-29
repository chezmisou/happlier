CREATE TABLE IF NOT EXISTS app_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  app_id UUID NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
  collection VARCHAR(100) NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_app_data_app_id ON app_data(app_id);
CREATE INDEX idx_app_data_collection ON app_data(app_id, collection);
CREATE INDEX idx_app_data_jsonb ON app_data USING GIN (data);

ALTER TABLE app_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert app_data"
  ON app_data FOR INSERT WITH CHECK (true);

CREATE POLICY "App owner can read app_data"
  ON app_data FOR SELECT USING (
    app_id IN (SELECT id FROM apps WHERE user_id = auth.uid())
  );

CREATE POLICY "App owner can delete app_data"
  ON app_data FOR DELETE USING (
    app_id IN (SELECT id FROM apps WHERE user_id = auth.uid())
  );
