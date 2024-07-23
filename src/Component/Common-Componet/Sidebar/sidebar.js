import rocket2 from "../../Assets/rocket2.svg";
import services2 from "../../Assets/services2.svg";
import traces2 from "../../Assets/traces2.svg";
import log2 from "../../Assets/log2.svg";
import dashboard2 from "../../Assets/dashboard2.svg";
import notification2 from "../../Assets/notification2.svg";
import bilings2 from "../../Assets/bilings2.svg";
import setting2 from "../../Assets/setting2.svg";
import Click from "../../Assets/click.svg";
import "../../Common-Componet/common.css";
import "../Sidebar/sidebar.css";

function Sidebar(props) {

    return (
        <div className="sidebar-container">
                    <div className="menu-link">
                        <ul>
                            <li>
                                <a href="/user">
                                <img src={rocket2} alt="rocket" />
                                Get Started</a>
                            </li>
                            <li>
                                <a href="/services">
                                <img src={services2} alt="rocket" />
                                Services
                                </a>
                            </li>
                            <li>
                                <a href="/traces">
                                <img src={traces2} alt="rocket" />
                                Traces</a>
                            </li>
                            <li>
                                <a href="/logs">
                                <img src={log2} alt="rocket" />
                                Logs</a>
                            </li>
                            <li>
                                <a href="/dashboard">
                                <img src={dashboard2} alt="rocket" />
                                Dashboards</a>
                            </li>
                            <li>
                                <a href="/allerts">
                                <img src={notification2} alt="rocket" />
                                Alerts</a>
                            </li>
                            <li>
                                <a href="/billings">
                                <img src={bilings2} alt="rocket" />
                                Billings</a>
                            </li>
                            <li>
                                <a href="/settings">
                                <img src={setting2} alt="rocket" />
                                Settings</a>
                            </li>
                            {/* <li>
                                <a href="/settings">
                                <img src={Settings} alt="rocket" />
                                LogOut</a>
                            </li> */}
                        </ul>
                    </div>
                </div>
    );
}
export default Sidebar;