Rails.application.routes.draw do
  devise_for :users

  resources :lists, only: [:index, :create, :update, :destroy] do
    member do
      put :move   # /lists/2/move
    end
  end

  resources :cards, only: [:create, :update, :destroy] do
    member do
      put :move   # /cards/2/move
    end
  end

  root 'lists#index'
end
