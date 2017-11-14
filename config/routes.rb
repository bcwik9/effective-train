Rails.application.routes.draw do
  root to: "clients#dashboard"

  get "client", to: "clients#dashboard"
end
