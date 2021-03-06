Rails.application.routes.draw do

  resources :garbage_bags
  resources :users
  resources :garbage_bag_duties
  resources :dorms
  resources :inactive_periods

  post '/users/me', to: 'users#me'
  post 'users/:id/token.json', to: 'users#get_token'
  post 'users/token.json', to: 'users#get_token'
  get 'users/:id/duties.json', to: 'users#duties'
  get 'users/:id/inactive_periods.json', to: 'users#inactive_periods'
  get 'users/:id/garbage_bags.json', to: 'users#garbage_bags'
  get 'users/:id/valid_token', to: 'users#valid_token'

  get 'dorms/:id/residents.json', to: 'dorms#residents'
  get 'dorms/:id/residents_summary.json', to: 'dorms#residents_summary'

  match '*path' => 'cors#preflight', :via => :options
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
