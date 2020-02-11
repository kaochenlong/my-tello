json.extract! card, :id, :name, :list_id, :position, :created_at, :updated_at
json.url card_url(card, format: :json)
