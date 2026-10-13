
import { useEffect, useState } from "react";
import "./App.css";

const initialAssets = [
  {
    id: "AST-101",
    name: "Annual Financial Report",
    category: "Finance",
    owner: "Admin",
    status: "Verified",
  },
  {
    id: "AST-102",
    name: "Project Documentation",
    category: "Research",
    owner: "Manager",
    status: "Verified",
  },
  {
    id: "AST-103",
    name: "Security Assessment",
    category: "Security",
    owner: "Auditor",
    status: "Pending",
  },
];

function App() {
  const [assets, setAssets] = useState(initialAssets);
  const [activity, setActivity] = useState([
    "System dashboard initialized",
    "Asset AST-101 integrity verified",
    "Asset AST-102 registered",
  ]);
  const [apiStatus, setApiStatus] = useState("Checking...");
  const [search, setSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/health")
      .then((response) => {
        if (!response.ok) throw new Error("API unavailable");
        return response.json();
      })
      .then((data) => {
        setApiStatus(data.status === "healthy" ? "Connected" : "Check API");
      })
      .catch(() => setApiStatus("Offline"));
  }, []);

  function addAsset(event) {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a document first.");
      return;
    }

    const newAsset = {
      id: `AST-${Date.now().toString().slice(-6)}`,
      name: selectedFile.name,
      category: "Uploaded File",
      owner: "Current User",
      status: "Not Verified",
    };

    setAssets((previous) => [newAsset, ...previous]);
    setActivity((previous) => [
      `File selected: ${selectedFile.name}`,
      ...previous,
    ]);
    setSelectedFile(null);
    event.target.reset();
  }

  const filteredAssets = assets.filter((asset) =>
    `${asset.id} ${asset.name} ${asset.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const verifiedCount = assets.filter(
    (asset) => asset.status === "Verified"
  ).length;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">T</div>
          <div>
            <h2>TechMove</h2>
            <p>SecureAsset</p>
          </div>
        </div>

        <p className="nav-heading">WORKSPACE</p>
        <a className="nav-link active" href="#dashboard">▦ Dashboard</a>
        <a className="nav-link" href="#assets">▤ Digital Assets</a>
        <a className="nav-link" href="#upload">↑ Upload Asset</a>
        <a className="nav-link" href="#audit">☷ Audit Trail</a>
        <a className="nav-link" href="#auditmitra">✧ AuditMitra AI</a>

        <div className="sidebar-bottom">
          <div className="security-card">
            <span className="security-icon">♧</span>
            <h3>Security First</h3>
            <p>Building trust through verifiable records.</p>
          </div>
          <div className="profile">
            <div className="avatar">LS</div>
            <div>
              <strong>Project Admin</strong>
              <p>Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="eyebrow">SECURE DIGITAL WORKSPACE</p>
            <h1>Security Dashboard</h1>
          </div>
          <div className="connection">
            <span
              className={`status-dot ${
                apiStatus === "Connected" ? "online" : ""
              }`}
            />
            API: {apiStatus}
          </div>
        </header>

        <section className="welcome">
          <div>
            <p className="eyebrow light">YOUR TRUSTED ASSET PLATFORM</p>
            <h2>Welcome to SecureAsset.</h2>
            <p>
              Manage digital assets, monitor integrity and review
              security activity in one place.
            </p>
          </div>
          <div className="welcome-symbol">⬡</div>
        </section>

        <section className="stats-grid">
          <article className="stat-card">
            <div className="stat-top">
              <span>Total Assets</span><span className="stat-icon blue">▤</span>
            </div>
            <h2>{assets.length}</h2>
            <p>Registered in this session</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Verified Assets</span><span className="stat-icon green">✓</span>
            </div>
            <h2>{verifiedCount}</h2>
            <p>Sample verified records</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Security Alerts</span><span className="stat-icon red">!</span>
            </div>
            <h2>0</h2>
            <p>No live monitoring configured</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Backend Status</span><span className="stat-icon purple">⌘</span>
            </div>
            <h2 className="status-value">{apiStatus}</h2>
            <p>FastAPI connection</p>
          </article>
        </section>

        <section className="content-grid">
          <article className="panel asset-panel" id="assets">
            <div className="panel-heading">
              <div>
                <h2>Digital Assets</h2>
                <p>Review your registered document records.</p>
              </div>
              <span className="small-count">{assets.length} records</span>
            </div>

            <input
              className="search-input"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search assets..."
            />

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ASSET</th>
                    <th>CATEGORY</th>
                    <th>OWNER</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets.map((asset) => (
                    <tr key={asset.id}>
                      <td>
                        <strong>{asset.name}</strong>
                        <small>{asset.id}</small>
                      </td>
                      <td>{asset.category}</td>
                      <td>{asset.owner}</td>
                      <td>
                        <span
                          className={`badge ${
                            asset.status === "Verified"
                              ? "verified"
                              : "pending"
                          }`}
                        >
                          {asset.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredAssets.length === 0 && (
                    <tr>
                      <td colSpan="4">No matching assets found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="demo-note">
              Demo data only — blockchain verification is not connected yet.
            </p>
          </article>

          <article className="panel upload-panel" id="upload">
            <div className="panel-heading">
              <div>
                <h2>Register an Asset</h2>
                <p>Add a document to the demo list.</p>
              </div>
              <span className="upload-icon">↑</span>
            </div>

            <form onSubmit={addAsset}>
              <label className="file-drop">
                <span className="file-symbol">⇧</span>
                <strong>
                  {selectedFile ? selectedFile.name : "Choose a document"}
                </strong>
                <span>Click to browse files</span>
                <input
                  type="file"
                  onChange={(event) =>
                    setSelectedFile(event.target.files?.[0] || null)
                  }
                  hidden
                />
              </label>

              <button className="primary-button" type="submit">
                + Add to Demo Dashboard
              </button>
            </form>

            <p className="demo-note">
              This demo adds the filename only. The file is not uploaded
              to the backend or blockchain yet.
            </p>
          </article>
        </section>

        <section className="bottom-grid">
          <article className="panel" id="audit">
            <div className="panel-heading">
              <div>
                <h2>Recent Audit Activity</h2>
                <p>Events generated in this browser session.</p>
              </div>
            </div>

            <div className="activity-list">
              {activity.map((item, index) => (
                <div className="activity-item" key={`${item}-${index}`}>
                  <span className="activity-dot">✓</span>
                  <div>
                    <strong>{item}</strong>
                    <p>Demo activity · Not yet on blockchain</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel ai-panel" id="auditmitra">
            <div className="ai-heading">
              <div className="ai-icon">✧</div>
              <div>
                <h2>AuditMitra AI</h2>
                <p>Audit assistant preview</p>
              </div>
            </div>
            <div className="ai-message">
              Hello! I will help you explore audit records once the
              audit query system is connected.
            </div>
            <p className="demo-note">
              AI answers are not connected in this version.
            </p>
          </article>
        </section>

        <footer>
          TechMove SecureAsset · Prototype v0.1 · Demo environment
        </footer>
      </main>
    </div>
  );
}

export default App;
