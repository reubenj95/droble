Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :outfit_clothes
      resources :seasons
      resources :occasions
      resources :brands
      resources :colours
      resources :outfits
      resources :clothes
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
