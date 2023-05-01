Rails.application.routes.draw do
  resources :outfit_clothes
  resources :seasons
  resources :occasions
  resources :brands
  resources :colours
  resources :outfits
  resources :clothes
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
