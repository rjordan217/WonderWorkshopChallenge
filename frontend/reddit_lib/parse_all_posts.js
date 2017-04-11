import extractPost from './extract_post'

export default function(allJSON) {
  return allJSON.data.children.map((unparsedPost) => {
    return extractPost(unparsedPost)
  })
}
