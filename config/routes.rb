Rails.application.routes.draw do
  root to: "clients#dashboard"

  get "dashboard", to: "clients#dashboard"
  post "build_list", to: "clients#build_list"
end
