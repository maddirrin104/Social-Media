import { Link } from 'react-router-dom';
import '../../styles/components/CommentItem.css';

const CommentItem = ({ comment }) => (
  <div className="comment-item">
    <img className="comment-avatar" src={comment.avatar} alt={comment.name} />
    <div className="comment-content">
      <Link to={`/profile/${comment.userId}`} className="comment-author">
        {comment.name}
      </Link>
      <span className="comment-text">{comment.content}</span>
    </div>
  </div>
);

export default CommentItem; 