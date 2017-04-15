export default function(srJSON) {
  const { id, url, title, subscribers, header_img, user_is_subscriber } = srJSON.data

  return {
    id,title,subscribers,header_img,
    name: url,
    amSubscribed: user_is_subscriber,
    isShowing:false,
    filter: 'new'
  }
}
