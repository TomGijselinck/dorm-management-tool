# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160719203729) do

  create_table "dorms", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "garbage_bag_duties", force: :cascade do |t|
    t.datetime "datetime"
    t.integer  "user_id"
    t.integer  "garbage_bag_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "garbage_bag_duties", ["garbage_bag_id"], name: "index_garbage_bag_duties_on_garbage_bag_id"
  add_index "garbage_bag_duties", ["user_id"], name: "index_garbage_bag_duties_on_user_id"

  create_table "garbage_bags", force: :cascade do |t|
    t.string   "name"
    t.string   "status"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "dorm_id"
  end

  add_index "garbage_bags", ["dorm_id"], name: "index_garbage_bags_on_dorm_id"
  add_index "garbage_bags", ["user_id"], name: "index_garbage_bags_on_user_id"

  create_table "inactive_periods", force: :cascade do |t|
    t.date     "start"
    t.date     "end"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
  end

  add_index "inactive_periods", ["user_id"], name: "index_inactive_periods_on_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "password_digest"
    t.integer  "dorm_id"
  end

  add_index "users", ["dorm_id"], name: "index_users_on_dorm_id"
  add_index "users", ["email"], name: "index_users_on_email", unique: true

end
