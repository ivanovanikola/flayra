
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'


const commentsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.updated_at.localeCompare(a.updated_at)
  })

const initialState =commentsAdapter.getInitialState({
status: 'idle',
error: null
})


export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ content, author, post }, thunkAPI) => {
    try {
      const response = await fetch(
        "http://localhost:1337/comments",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
            author,
            post,
          }),
        }
      )
      let data = await response.json()
      if (response.status === 200) {
        return { ...data, content: content, author: author, post: post }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log("Error", e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

 const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addComment.fulfilled, commentsAdapter.addOne)
  }
});

export default commentsSlice.reducer;

export const {
    selectAll: selectAllComments,
    selectById: selectCommentById,
    selectIds: selectCommentIds
  } = commentsAdapter.getSelectors(state => state.comments)


