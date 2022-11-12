import PostListItem from "../PostListItem"
import './PostList.css'

const PostList = ({ posts, onDelete, onToggleImpportant, onToggleLiked }) => {
    const elements = posts.map((item) => {
        const { id, ...itemProps } = item
        return (
            <li key={id} className="list-group-item">
                <PostListItem
                    {...itemProps}
                    onDelete={() => onDelete(id)}
                    onToggleImpportant={() => onToggleImpportant(id)}
                    onToggleLiked={() => onToggleLiked(id)}
                />
            </li>
        )
    })
    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default PostList