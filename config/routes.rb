Rails.application.routes.draw do
  devise_for :users

  resources :lists do
    member do
      put :move   # /lists/2/move
    end
  end

  resources :cards do
    member do
      put :move   # /cards/2/move
    end
  end

  root 'lists#index'
end
