import { Link } from "react-router-dom";

export default function Profile() {
 return (
    <div>
      <nav>
        <div>
          <button>
            <Link to="/">Home</Link>
          </button>
        </div>
      </nav>
      <div>
        프로필 페이지
      </div>
    </div>
  );
}