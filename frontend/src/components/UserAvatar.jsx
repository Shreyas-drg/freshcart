import './UserAvatar.css';

const UserAvatar = ({ name, size = 44 }) => {
  // Get first two initial words
  const initials = name
    ?.split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase() || '?';

  const avatarSize = size;

  return (
    <div
      className="user-avatar"
      style={{
        width: avatarSize,
        height: avatarSize,
        fontSize: avatarSize * 0.35,
      }}
    >
      {initials}
    </div>
  );
};

export default UserAvatar;
