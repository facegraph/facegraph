
if Rails.env == "production"
  APPLICATION_CONFIG = YAML.load_file(File.join(Rails.root, "config", "production.yml"))
elsif Rails.env == "development"
  APPLICATION_CONFIG = YAML.load_file(File.join(Rails.root, "config", "development.yml"))
end
