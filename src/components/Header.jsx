const GENRES = [
  { id: "", label: "Género" },
  { id: "28", label: "Acción" },
  { id: "35", label: "Comedia" },
  { id: "18", label: "Drama" },
  { id: "27", label: "Terror" },
  { id: "878", label: "Ciencia Ficción" },
  { id: "10749", label: "Romance" },
  { id: "53", label: "Thriller" },
];

const YEARS = (() => {
  const y = [];
  for (let i = new Date().getFullYear(); i >= 1980; i--) y.push(i);
  return y;
})();

function Header({ onSearch, onFilter, onHome, onFavorites }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 800,
      background: "rgba(10,10,10,0.95)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid #333",
      padding: "12px 30px",
      display: "flex", alignItems: "center",
      justifyContent: "space-between", flexWrap: "wrap", gap: "10px",
    }}>
      <h1 onClick={onHome} style={{ color: "white", cursor: "pointer", fontSize: "22px", margin: 0 }}>
        🎬 MovieApp
      </h1>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Buscar película..."
          onKeyDown={(e) => e.key === "Enter" && onSearch(e.target.value)}
          style={{
            padding: "8px 16px", borderRadius: "20px",
            border: "1px solid #444", background: "#222",
            color: "white", outline: "none", width: "200px",
          }}
        />
        <select onChange={(e) => onFilter("genre", e.target.value)} style={{ padding: "8px 12px", borderRadius: "20px", border: "1px solid #444", background: "#222", color: "white" }}>
          {GENRES.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
        </select>
        <select onChange={(e) => onFilter("year", e.target.value)} style={{ padding: "8px 12px", borderRadius: "20px", border: "1px solid #444", background: "#222", color: "white" }}>
          <option value="">Año</option>
          {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <button onClick={onFavorites} style={{ padding: "8px 16px", borderRadius: "20px", background: "#333", border: "none", color: "white", cursor: "pointer" }}>
          ⭐ Mi Lista
        </button>
      </div>
    </header>
  );
}

export default Header;