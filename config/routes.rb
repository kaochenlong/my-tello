Rails.application.routes.draw do
  devise_for :users

  resources :lists do
    member do
      put :move   # /lists/2/move
    end
  end
  resources :cards

  root 'lists#index'
end
