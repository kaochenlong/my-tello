class ListsController < ApplicationController
  before_action :set_list, only: [:show, :edit, :update, :destroy, :move]
  before_action :authenticate_user!

  def index
    @lists = current_user.lists
  end

  def move
    @list.insert_at(list_params[:position].to_i)
    render 'show.json'
  end

  def create
    @list = current_user.lists.new(list_params)

    respond_to do |format|
      if @list.save
        ActionCable.server.broadcast "board", { commit: 'ADD_LIST', payload: render_to_string(:show, format: :json)}
        format.html { redirect_to @list, notice: 'List was successfully created.' }
        format.json { render :show, status: :created, location: @list }
      else
        format.html { render :new }
        format.json { render json: @list.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @list.update(list_params)
        format.html { redirect_to @list, notice: 'List was successfully updated.' }
        format.json { render :show, status: :ok, location: @list }
      else
        format.html { render :edit }
        format.json { render json: @list.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @list.destroy
    ActionCable.server.broadcast "board", { commit: 'REMOVE_LIST', payload: render_to_string(:show, format: :json)}
    respond_to do |format|
      format.html { redirect_to lists_url, notice: 'List was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_list
      @list = current_user.lists.find(params[:id])
    end

    def list_params
      params.require(:list).permit(:name, :position)
    end
end
