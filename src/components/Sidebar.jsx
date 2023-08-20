import Navbar from "./Navbar";
import Chats from "./Chats";
import Search from "./Search";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <div className="search-chats">
        <Search />
        <Chats />
      </div>
    </div>
  );
};

export default Sidebar;
