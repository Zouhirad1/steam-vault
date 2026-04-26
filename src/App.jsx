import { useState, useEffect } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0c10;
    --surface: #0f1318;
    --card: #141920;
    --card-hover: #1a2130;
    --border: #1e2a3a;
    --border-bright: #2a3d55;
    --accent: #1a9fff;
    --accent-dim: #0d5c99;
    --accent-glow: rgba(26,159,255,0.15);
    --text: #c8d8e8;
    --text-dim: #5a7a9a;
    --text-bright: #e8f4ff;
    --green: #4aff9a;
    --green-dim: rgba(74,255,154,0.1);
    --gold: #ffd700;
    --gold-dim: rgba(255,215,0,0.1);
    --mono: 'Share Tech Mono', monospace;
    --head: 'Rajdhani', sans-serif;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--head); }

  .app {
    min-height: 100vh;
    background: var(--bg);
    background-image:
      radial-gradient(ellipse 80% 50% at 50% -10%, rgba(26,100,180,0.12) 0%, transparent 60%),
      repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.012) 40px, rgba(255,255,255,0.012) 41px),
      repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.012) 40px, rgba(255,255,255,0.012) 41px);
  }

  /* HEADER */
  .header {
    padding: 28px 40px 20px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 16px;
    background: rgba(10,12,16,0.9);
    backdrop-filter: blur(12px);
    position: sticky; top: 0; z-index: 100;
  }
  .header-logo {
    width: 36px; height: 36px; background: var(--accent); border-radius: 6px;
    display: flex; align-items: center; justify-content: center; font-size: 20px;
    box-shadow: 0 0 20px rgba(26,159,255,0.4); flex-shrink: 0;
  }
  .header-title { font-size: 22px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--text-bright); }
  .header-sub { font-family: var(--mono); font-size: 11px; color: var(--text-dim); letter-spacing: 1px; margin-top: 2px; }
  .header-right { margin-left: auto; display: flex; align-items: center; gap: 12px; }
  .status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); box-shadow: 0 0 8px var(--green); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  .status-label { font-family: var(--mono); font-size: 11px; color: var(--text-dim); }

  /* MAIN */
  .main { padding: 40px; max-width: 1400px; margin: 0 auto; }

  /* INPUT SCREEN */
  .input-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70vh; gap: 48px; }
  .hero-label { font-family: var(--mono); font-size: 12px; color: var(--accent); letter-spacing: 4px; text-transform: uppercase; margin-bottom: 16px; text-align:center; }
  .hero-title { font-size: clamp(36px, 6vw, 72px); font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: var(--text-bright); line-height: 1; margin-bottom: 12px; text-align:center; }
  .hero-title span { color: var(--accent); }
  .hero-desc { font-family: var(--mono); font-size: 13px; color: var(--text-dim); line-height: 1.7; max-width: 440px; margin: 0 auto; text-align:center; }
  .input-panel { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 32px; width: 100%; max-width: 520px; box-shadow: 0 0 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04); }
  .input-row { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .input-label { font-family: var(--mono); font-size: 11px; color: var(--text-dim); letter-spacing: 2px; text-transform: uppercase; }
  .text-input { background: var(--bg); border: 1px solid var(--border); border-radius: 6px; padding: 12px 16px; color: var(--text-bright); font-family: var(--mono); font-size: 14px; width: 100%; transition: border-color 0.2s, box-shadow 0.2s; outline: none; }
  .text-input:focus { border-color: var(--accent-dim); box-shadow: 0 0 0 3px var(--accent-glow); }
  .text-input::placeholder { color: var(--text-dim); }
  .btn-primary { width: 100%; padding: 14px; background: var(--accent); color: #000; border: none; border-radius: 6px; font-family: var(--head); font-size: 15px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; cursor: pointer; transition: all 0.2s; margin-top: 8px; }
  .btn-primary:hover:not(:disabled) { background: #4db8ff; box-shadow: 0 0 30px rgba(26,159,255,0.4); transform: translateY(-1px); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
  .hint-box { margin-top: 20px; padding: 12px 16px; background: var(--green-dim); border: 1px solid rgba(74,255,154,0.2); border-radius: 6px; font-family: var(--mono); font-size: 11px; color: var(--green); line-height: 1.6; }
  .hint-box strong { color: #7dffb8; }
  .error-box { padding: 12px 16px; background: rgba(255,80,80,0.08); border: 1px solid rgba(255,80,80,0.25); border-radius: 6px; font-family: var(--mono); font-size: 12px; color: #ff8080; margin-top: 12px; }

  /* LOADING */
  .loading-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; gap: 24px; }
  .scanner { width: 80px; height: 80px; position: relative; }
  .scanner-ring { position: absolute; inset: 0; border: 2px solid transparent; border-top-color: var(--accent); border-radius: 50%; animation: spin 1s linear infinite; }
  .scanner-ring:nth-child(2) { inset: 8px; border-top-color: var(--green); animation-duration: 1.5s; animation-direction: reverse; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { font-family: var(--mono); font-size: 13px; color: var(--text-dim); animation: blink 1.2s steps(1) infinite; }
  @keyframes blink { 50% { opacity: 0; } }

  /* STATS BAR */
  .stats-bar { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; margin-bottom: 32px; }
  .stat-cell { background: var(--surface); padding: 20px 24px; display: flex; flex-direction: column; gap: 4px; }
  .stat-value { font-size: 28px; font-weight: 700; color: var(--text-bright); letter-spacing: 1px; }
  .stat-value.accent { color: var(--accent); }
  .stat-value.green { color: var(--green); }
  .stat-label { font-family: var(--mono); font-size: 10px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 2px; }

  /* CONTROLS */
  .controls { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
  .search-wrap { position: relative; flex: 1; min-width: 200px; }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; color: var(--text-dim); }
  .search-input { width: 100%; background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 10px 12px 10px 36px; color: var(--text-bright); font-family: var(--mono); font-size: 13px; outline: none; transition: border-color 0.2s; }
  .search-input:focus { border-color: var(--accent-dim); }
  .search-input::placeholder { color: var(--text-dim); }
  .sort-btn { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 10px 16px; color: var(--text-dim); font-family: var(--mono); font-size: 11px; letter-spacing: 1px; cursor: pointer; transition: all 0.2s; white-space: nowrap; text-transform: uppercase; }
  .sort-btn:hover, .sort-btn.active { border-color: var(--accent-dim); color: var(--accent); background: var(--accent-glow); }
  .results-count { font-family: var(--mono); font-size: 11px; color: var(--text-dim); white-space: nowrap; }
  .results-count span { color: var(--accent); }
  .btn-back { background: transparent; border: 1px solid var(--border); border-radius: 6px; padding: 10px 16px; color: var(--text-dim); font-family: var(--mono); font-size: 11px; cursor: pointer; transition: all 0.2s; text-transform: uppercase; letter-spacing: 1px; }
  .btn-back:hover { border-color: var(--border-bright); color: var(--text); }

  /* GAME GRID */
  .game-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
  .game-card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; cursor: pointer; transition: all 0.2s; position: relative; }
  .game-card:hover { border-color: var(--accent-dim); transform: translateY(-3px); box-shadow: 0 8px 30px rgba(0,0,0,0.4), 0 0 20px var(--accent-glow); background: var(--card-hover); }
  .game-img-wrap { width: 100%; aspect-ratio: 460/215; position: relative; background: var(--surface); overflow: hidden; }
  .game-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
  .game-card:hover .game-img { transform: scale(1.04); }
  .game-img-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 32px; color: var(--text-dim); background: linear-gradient(135deg, #0f1318, #1a2130); }
  .never-played-badge { position: absolute; top: 8px; right: 8px; background: rgba(10,12,16,0.85); border: 1px solid var(--border); border-radius: 4px; padding: 2px 6px; font-family: var(--mono); font-size: 9px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 1px; }
  .game-info { padding: 12px; }
  .game-name { font-size: 13px; font-weight: 600; color: var(--text-bright); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px; letter-spacing: 0.5px; }
  .game-playtime { display: flex; align-items: center; gap: 6px; }
  .playtime-bar-wrap { flex: 1; height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; }
  .playtime-bar { height: 100%; border-radius: 2px; background: linear-gradient(90deg, var(--accent-dim), var(--accent)); }
  .playtime-bar.zero { background: var(--border-bright); }
  .playtime-label { font-family: var(--mono); font-size: 10px; color: var(--text-dim); white-space: nowrap; flex-shrink: 0; }
  .playtime-label.has-time { color: var(--accent); }

  /* ACHIEVEMENT SCREEN */
  .ach-screen { animation: fadeIn 0.25s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  .ach-hero {
    position: relative; border-radius: 12px; overflow: hidden;
    margin-bottom: 32px; min-height: 180px;
    display: flex; align-items: flex-end;
    border: 1px solid var(--border);
  }
  .ach-hero-bg { position: absolute; inset: 0; object-fit: cover; width: 100%; height: 100%; filter: blur(2px) brightness(0.35); }
  .ach-hero-bg-placeholder { position: absolute; inset: 0; background: linear-gradient(135deg, #0f1318, #1a2130); }
  .ach-hero-content { position: relative; z-index: 1; padding: 28px 32px; width: 100%; display: flex; align-items: flex-end; gap: 24px; background: linear-gradient(to top, rgba(10,12,16,0.95) 0%, transparent 100%); }
  .ach-hero-img { width: 80px; height: 80px; border-radius: 8px; border: 2px solid var(--border-bright); object-fit: cover; flex-shrink: 0; }
  .ach-hero-info { flex: 1; }
  .ach-hero-name { font-size: 32px; font-weight: 700; letter-spacing: 2px; color: var(--text-bright); text-transform: uppercase; }
  .ach-hero-playtime { font-family: var(--mono); font-size: 12px; color: var(--text-dim); margin-top: 4px; }
  .ach-progress-wrap { width: 200px; flex-shrink: 0; }
  .ach-progress-label { font-family: var(--mono); font-size: 11px; color: var(--text-dim); margin-bottom: 6px; display: flex; justify-content: space-between; }
  .ach-progress-label span { color: var(--gold); }
  .ach-progress-bar { height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; }
  .ach-progress-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #b8860b, var(--gold)); transition: width 0.8s ease; }

  .ach-controls { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }

  .ach-stats { display: flex; gap: 16px; margin-left: auto; }
  .ach-stat { font-family: var(--mono); font-size: 11px; display: flex; align-items: center; gap: 6px; }
  .ach-stat-dot { width: 8px; height: 8px; border-radius: 50%; }
  .ach-stat-dot.unlocked { background: var(--gold); box-shadow: 0 0 6px var(--gold); }
  .ach-stat-dot.locked { background: var(--border-bright); }

  /* ACH LIST */
  .ach-list { display: flex; flex-direction: column; gap: 8px; }

  .ach-item {
    display: flex; align-items: center; gap: 16px;
    background: var(--card); border: 1px solid var(--border);
    border-radius: 8px; padding: 14px 18px;
    transition: all 0.2s;
  }
  .ach-item.unlocked { border-color: rgba(255,215,0,0.2); }
  .ach-item.unlocked:hover { border-color: rgba(255,215,0,0.4); background: rgba(255,215,0,0.04); }
  .ach-item.locked { opacity: 0.55; }
  .ach-item.locked:hover { opacity: 0.75; }

  .ach-icon-wrap { width: 52px; height: 52px; flex-shrink: 0; position: relative; }
  .ach-icon { width: 100%; height: 100%; border-radius: 6px; object-fit: cover; }
  .ach-icon.locked-img { filter: grayscale(1) brightness(0.4); }
  .ach-lock-overlay {
    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }

  .ach-info { flex: 1; min-width: 0; }
  .ach-name { font-size: 15px; font-weight: 600; color: var(--text-bright); letter-spacing: 0.5px; margin-bottom: 3px; }
  .ach-item.unlocked .ach-name { color: var(--gold); }
  .ach-desc { font-family: var(--mono); font-size: 11px; color: var(--text-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .ach-right { text-align: right; flex-shrink: 0; }
  .ach-date { font-family: var(--mono); font-size: 10px; color: var(--green); }
  .ach-rarity { font-family: var(--mono); font-size: 10px; color: var(--text-dim); margin-top: 2px; }

  .ach-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px; gap: 20px; }
  .ach-error { text-align: center; padding: 60px; font-family: var(--mono); font-size: 13px; color: #ff8080; }
  .no-ach { text-align: center; padding: 60px; font-family: var(--mono); font-size: 13px; color: var(--text-dim); }

  .filter-btn { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 8px 14px; color: var(--text-dim); font-family: var(--mono); font-size: 11px; cursor: pointer; transition: all 0.2s; text-transform: uppercase; letter-spacing: 1px; }
  .filter-btn:hover, .filter-btn.active { border-color: var(--accent-dim); color: var(--accent); background: var(--accent-glow); }
  .filter-btn.gold.active { border-color: rgba(255,215,0,0.4); color: var(--gold); background: var(--gold-dim); }

  .empty { text-align: center; padding: 80px 20px; color: var(--text-dim); font-family: var(--mono); font-size: 13px; }
`;

function formatHours(minutes) {
  if (!minutes) return "0h";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function formatDate(unix) {
  if (!unix) return "";
  return new Date(unix * 1000).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function GameCard({ game, maxPlaytime, onClick }) {
  const [imgError, setImgError] = useState(false);
  const pct = maxPlaytime > 0 ? (game.playtime_forever / maxPlaytime) * 100 : 0;
  const imgUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`;
  return (
    <div className="game-card" onClick={() => onClick(game)}>
      <div className="game-img-wrap">
        {!imgError
          ? <img className="game-img" src={imgUrl} alt={game.name} onError={() => setImgError(true)} />
          : <div className="game-img-placeholder">🎮</div>}
        {!game.playtime_forever && <div className="never-played-badge">Never played</div>}
      </div>
      <div className="game-info">
        <div className="game-name" title={game.name}>{game.name}</div>
        <div className="game-playtime">
          <div className="playtime-bar-wrap">
            <div className={`playtime-bar ${!game.playtime_forever ? "zero" : ""}`}
              style={{ width: `${Math.max(pct, game.playtime_forever ? 3 : 0)}%` }} />
          </div>
          <span className={`playtime-label ${game.playtime_forever ? "has-time" : ""}`}>
            {formatHours(game.playtime_forever)}
          </span>
        </div>
      </div>
    </div>
  );
}

function AchievementScreen({ game, apiKey, steamId, onBack }) {
  const [achievements, setAchievements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all | unlocked | locked
  const [search, setSearch] = useState("");
  const [heroImgError, setHeroImgError] = useState(false);
  const [gameImgError, setGameImgError] = useState(false);

  const heroUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/library_hero.jpg`;
  const capsuleUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/library_600x900.jpg`;

  useState(() => {
    async function load() {
      setLoading(true);
      try {
        const [playerRes, schemaRes] = await Promise.all([
          fetch(`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${game.appid}&key=${apiKey}&steamid=${steamId}&format=json`),
          fetch(`https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0002/?appid=${game.appid}&key=${apiKey}&format=json`)
        ]);
        const playerData = await playerRes.json();
        const schemaData = await schemaRes.json();

        if (!playerData.playerstats?.achievements) {
          setError("This game has no achievements, or its stats are not available.");
          setLoading(false);
          return;
        }

        const playerAchs = playerData.playerstats.achievements;
        const schemaAchs = schemaData.game?.availableGameStats?.achievements || [];

        // Build a map from schema
        const schemaMap = {};
        schemaAchs.forEach((a, i) => {
          schemaMap[a.name] = { ...a, index: i };
        });

        // Merge
        const merged = playerAchs.map((a) => {
          const schema = schemaMap[a.apiname] || {};
          return {
            apiname: a.apiname,
            achieved: a.achieved === 1,
            unlocktime: a.unlocktime,
            name: schema.displayName || a.apiname,
            description: schema.description || "",
            icon: schema.icon || "",
            icongray: schema.icongray || "",
            // We'll fake rarity by index in schema (lower index = more common usually)
            rarityIndex: schema.index ?? 999,
          };
        });

        // Sort by rarity (hardest first = highest index in schema = rarest)
        merged.sort((a, b) => b.rarityIndex - a.rarityIndex);

        setAchievements(merged);
      } catch (e) {
        setError("Failed to load achievements. This game may not support achievement tracking.");
      }
      setLoading(false);
    }
    load();
  }, []);

  const filtered = (achievements || [])
    .filter(a => {
      if (filter === "unlocked" && !a.achieved) return false;
      if (filter === "locked" && a.achieved) return false;
      if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

  const unlocked = (achievements || []).filter(a => a.achieved).length;
  const total = (achievements || []).length;
  const pct = total > 0 ? Math.round((unlocked / total) * 100) : 0;

  return (
    <div className="ach-screen">
      {/* Hero banner */}
      <div className="ach-hero">
        {!heroImgError
          ? <img className="ach-hero-bg" src={heroUrl} alt="" onError={() => setHeroImgError(true)} />
          : <div className="ach-hero-bg-placeholder" />}
        <div className="ach-hero-content">
          {!gameImgError
            ? <img className="ach-hero-img" src={capsuleUrl} alt={game.name} onError={() => setGameImgError(true)} />
            : <div style={{width:80,height:80,borderRadius:8,background:"var(--surface)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>🎮</div>}
          <div className="ach-hero-info">
            <div className="ach-hero-name">{game.name}</div>
            <div className="ach-hero-playtime">⏱ {formatHours(game.playtime_forever)} played</div>
          </div>
          {achievements && (
            <div className="ach-progress-wrap">
              <div className="ach-progress-label">
                <span>ACHIEVEMENTS</span>
                <span>{unlocked} / {total}</span>
              </div>
              <div className="ach-progress-bar">
                <div className="ach-progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <div style={{fontFamily:"var(--mono)",fontSize:10,color:"var(--text-dim)",marginTop:4,textAlign:"right"}}>{pct}% complete</div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="ach-controls">
        <button className="btn-back" onClick={onBack}>← BACK TO LIBRARY</button>
        <div className="search-wrap" style={{maxWidth:280}}>
          <span className="search-icon">⌕</span>
          <input className="search-input" placeholder="Search achievements..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {["all","unlocked","locked"].map(f => (
          <button key={f} className={`filter-btn ${f === "unlocked" ? "gold" : ""} ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
            {f === "all" ? "All" : f === "unlocked" ? "✓ Unlocked" : "🔒 Locked"}
          </button>
        ))}
        {achievements && (
          <div className="ach-stats">
            <div className="ach-stat"><div className="ach-stat-dot unlocked"/><span style={{color:"var(--text-dim)"}}>{unlocked} unlocked</span></div>
            <div className="ach-stat"><div className="ach-stat-dot locked"/><span style={{color:"var(--text-dim)"}}>{total - unlocked} locked</span></div>
          </div>
        )}
      </div>

      {/* Content */}
      {loading && (
        <div className="ach-loading">
          <div className="scanner"><div className="scanner-ring"/><div className="scanner-ring"/></div>
          <div className="loading-text">LOADING ACHIEVEMENTS...</div>
        </div>
      )}
      {error && <div className="ach-error">⚠ {error}</div>}
      {!loading && !error && filtered.length === 0 && (
        <div className="no-ach">{search ? `No achievements match "${search}"` : "No achievements to show."}</div>
      )}
      {!loading && !error && filtered.length > 0 && (
        <div className="ach-list">
          {filtered.map(a => (
            <div key={a.apiname} className={`ach-item ${a.achieved ? "unlocked" : "locked"}`}>
              <div className="ach-icon-wrap">
                {(a.achieved ? a.icon : a.icongray) ? (
                  <img className={`ach-icon ${!a.achieved ? "locked-img" : ""}`}
                    src={a.achieved ? a.icon : a.icongray} alt={a.name}
                    onError={e => e.target.style.display = "none"} />
                ) : (
                  <div className="ach-icon" style={{background:"var(--surface)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>
                    {a.achieved ? "🏆" : "🔒"}
                  </div>
                )}
                {!a.achieved && <div className="ach-lock-overlay">🔒</div>}
              </div>
              <div className="ach-info">
                <div className="ach-name">{a.name}</div>
                <div className="ach-desc">{a.description || "Hidden achievement"}</div>
              </div>
              <div className="ach-right">
                {a.achieved && <div className="ach-date">✓ {formatDate(a.unlocktime)}</div>}
                <div className="ach-rarity">#{a.rarityIndex + 1} rarest</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [steamId, setSteamId] = useState(() => localStorage.getItem("steamId") || "");
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("apiKey") || "");

  useEffect(() => {
  localStorage.setItem("steamId", steamId);
  localStorage.setItem("apiKey", apiKey);
}, [steamId, apiKey]);

useEffect(() => {
  if (steamId && apiKey) fetchLibrary();
}, []);
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("playtime");
  const [profile, setProfile] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  async function fetchLibrary() {
    if (!steamId.trim() || !apiKey.trim()) { setError("Please enter both your Steam API key and Steam ID."); return; }
    setLoading(true); setError(""); setGames(null); setProfile(null);
    try {
      const gamesRes = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey.trim()}&steamid=${steamId.trim()}&include_appinfo=true&include_played_free_games=true&format=json`);
      const gamesData = await gamesRes.json();
      const profileRes = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey.trim()}&steamids=${steamId.trim()}&format=json`);
      const profileData = await profileRes.json();
      if (!gamesData.response?.games) { setError("Profile is private or has no games. Make sure your Steam profile and game details are set to Public."); setLoading(false); return; }
      setGames(gamesData.response.games);
      setProfile(profileData.response?.players?.[0] || null);
    } catch (e) {
      setError("Failed to fetch library. Check your API key and Steam ID, and ensure your profile is public.");
    }
    setLoading(false);
  }

  const filtered = (games || [])
    .filter(g => g.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "playtime") return (b.playtime_forever || 0) - (a.playtime_forever || 0);
      if (sort === "name") return (a.name || "").localeCompare(b.name || "");
      if (sort === "recent") return (b.playtime_2weeks || 0) - (a.playtime_2weeks || 0);
      return 0;
    });

  const maxPlaytime = Math.max(...(games || []).map(g => g.playtime_forever || 0), 1);
  const totalHours = Math.round((games || []).reduce((s, g) => s + (g.playtime_forever || 0), 0) / 60);
  const played = (games || []).filter(g => g.playtime_forever > 0).length;
  const recentlyPlayed = (games || []).filter(g => g.playtime_2weeks > 0).length;

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        <header className="header">
          <div className="header-logo">🎮</div>
          <div>
            <div className="header-title">Steam <span style={{color:"var(--accent)"}}>Vault</span></div>
            <div className="header-sub">// LIBRARY SCANNER v2.0</div>
          </div>
          {games && !selectedGame && (
            <div className="header-right">
              <div className="status-dot" />
              <span className="status-label">LIBRARY LOADED</span>
            </div>
          )}
          {selectedGame && (
            <div className="header-right">
              <div className="status-dot" style={{background:"var(--gold)",boxShadow:"0 0 8px var(--gold)"}} />
              <span className="status-label">ACHIEVEMENTS</span>
            </div>
          )}
        </header>

        <div className="main">
          {/* INPUT */}
          {!games && !loading && (
            <div className="input-screen">
              <div>
                <div className="hero-label">// Steam Library Scanner</div>
                <div className="hero-title">Your <span>Games</span>.<br/>All of them.</div>
                <div className="hero-desc">Connect your Steam account to explore your library and track achievements.</div>
              </div>
              <div className="input-panel">
                <div className="input-row">
                  <label className="input-label">Steam API Key</label>
                  <input className="text-input" type="password" placeholder="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" value={apiKey} onChange={e => setApiKey(e.target.value)} />
                </div>
                <div className="input-row">
                  <label className="input-label">Steam ID (64-bit)</label>
                  <input className="text-input" type="text" placeholder="76561198XXXXXXXXX" value={steamId} onChange={e => setSteamId(e.target.value)} onKeyDown={e => e.key === "Enter" && fetchLibrary()} />
                </div>
                {error && <div className="error-box">⚠ {error}</div>}
                <button className="btn-primary" onClick={fetchLibrary} disabled={loading}>SCAN LIBRARY</button>
                <div className="hint-box">
                  <strong>API key:</strong> steamcommunity.com/dev/apikey<br/>
                  <strong>Steam ID:</strong> steamid.io — paste your profile URL
                </div>
              </div>
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="loading-screen">
              <div className="scanner"><div className="scanner-ring"/><div className="scanner-ring"/></div>
              <div className="loading-text">SCANNING STEAM LIBRARY...</div>
            </div>
          )}

          {/* ACHIEVEMENT SCREEN */}
          {games && selectedGame && (
            <AchievementScreen
              game={selectedGame}
              apiKey={apiKey}
              steamId={steamId}
              onBack={() => setSelectedGame(null)}
            />
          )}

          {/* LIBRARY */}
          {games && !selectedGame && (
            <>
              <div className="stats-bar">
                {profile && (
                  <div className="stat-cell" style={{flexDirection:"row",alignItems:"center",gap:12}}>
                    {profile.avatarfull && <img src={profile.avatarfull} alt="avatar" style={{width:44,height:44,borderRadius:6,border:"2px solid var(--border-bright)"}} />}
                    <div>
                      <div className="stat-value" style={{fontSize:18}}>{profile.personaname}</div>
                      <div className="stat-label">Steam Profile</div>
                    </div>
                  </div>
                )}
                <div className="stat-cell"><div className="stat-value accent">{games.length}</div><div className="stat-label">Total Games</div></div>
                <div className="stat-cell"><div className="stat-value green">{totalHours.toLocaleString()}h</div><div className="stat-label">Total Playtime</div></div>
                <div className="stat-cell"><div className="stat-value">{played}</div><div className="stat-label">Games Played</div></div>
                <div className="stat-cell"><div className="stat-value" style={{color:"#ffb84a"}}>{recentlyPlayed}</div><div className="stat-label">Active (2 weeks)</div></div>
              </div>

              <div className="controls">
                <button className="btn-back" onClick={() => { setGames(null); setError(""); setSearch(""); }}>← NEW SCAN</button>
                <div className="search-wrap">
                  <span className="search-icon">⌕</span>
                  <input className="search-input" placeholder="Search games..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                {["playtime","name","recent"].map(s => (
                  <button key={s} className={`sort-btn ${sort === s ? "active" : ""}`} onClick={() => setSort(s)}>
                    {s === "playtime" ? "Most Played" : s === "name" ? "A–Z" : "Recent"}
                  </button>
                ))}
                <span className="results-count"><span>{filtered.length}</span> / {games.length} games</span>
              </div>

              {filtered.length === 0
                ? <div className="empty">No games match "{search}"</div>
                : <div className="game-grid">
                    {filtered.map(game => (
                      <GameCard key={game.appid} game={game} maxPlaytime={maxPlaytime} onClick={setSelectedGame} />
                    ))}
                  </div>
              }
            </>
          )}
        </div>
      </div>
    </>
  );
}
