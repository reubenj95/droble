require "test_helper"

class OccasionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @occasion = occasions(:one)
  end

  test "should get index" do
    get occasions_url, as: :json
    assert_response :success
  end

  test "should create occasion" do
    assert_difference("Occasion.count") do
      post occasions_url, params: { occasion: { name: @occasion.name } }, as: :json
    end

    assert_response :created
  end

  test "should show occasion" do
    get occasion_url(@occasion), as: :json
    assert_response :success
  end

  test "should update occasion" do
    patch occasion_url(@occasion), params: { occasion: { name: @occasion.name } }, as: :json
    assert_response :success
  end

  test "should destroy occasion" do
    assert_difference("Occasion.count", -1) do
      delete occasion_url(@occasion), as: :json
    end

    assert_response :no_content
  end
end
