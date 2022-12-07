import { Link } from "react-router-dom";

export default function About() {
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
        어바웃 페이지
      </div>
    </div>
  );
}
