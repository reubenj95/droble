require "test_helper"

class OutfitClothesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @outfit_clothe = outfit_clothes(:one)
  end

  test "should get index" do
    get outfit_clothes_url, as: :json
    assert_response :success
  end

  test "should create outfit_clothe" do
    assert_difference("OutfitClothe.count") do
      post outfit_clothes_url, params: { outfit_clothe: {  } }, as: :json
    end

    assert_response :created
  end

  test "should show outfit_clothe" do
    get outfit_clothe_url(@outfit_clothe), as: :json
    assert_response :success
  end

  test "should update outfit_clothe" do
    patch outfit_clothe_url(@outfit_clothe), params: { outfit_clothe: {  } }, as: :json
    assert_response :success
  end

  test "should destroy outfit_clothe" do
    assert_difference("OutfitClothe.count", -1) do
      delete outfit_clothe_url(@outfit_clothe), as: :json
    end

    assert_response :no_content
  end
end
