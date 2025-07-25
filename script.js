async function fetchServerStatus() {
  try {
    const response = await fetch('https://corsproxy.io/?https://onehouronelife.com/serveList/serverList.php');
    const text = await response.text();
    const lines = text.trim().split('\n');
    const servers = lines.map(line => {
      const [ip, port, currentPlayers, maxPlayers, load] = line.split(',');
      return { ip, port, currentPlayers, maxPlayers, load };
    });

    const list = document.getElementById('serverList');
    list.innerHTML = '';
    servers.forEach(server => {
      const li = document.createElement('li');
      li.innerText = `${server.ip} → ${server.currentPlayers}/${server.maxPlayers} players (load: ${server.load})`;
      list.appendChild(li);
    });
  } catch (err) {
    document.getElementById('serverList').innerText = 'Failed to load server data.';
    console.error('Error fetching server status:', err);
  }
}

async function fetchLeaderboard() {
  try {
    const response = await fetch('https://corsproxy.io/?https://onehouronelife.com/fitnessServer/server.php?action=leaderboard');
    const text = await response.text();
    const lines = text.trim().split('\n');
    const list = document.getElementById('leaderboardList');
    list.innerHTML = '';
    lines.slice(0, 10).forEach((line, i) => {
      const [name, score] = line.split(',');
      const li = document.createElement('li');
      li.innerText = `#${i + 1}: ${name} – Score: ${score}`;
      list.appendChild(li);
    });
  } catch (err) {
    document.getElementById('leaderboardList').innerText = 'Failed to load leaderboard.';
    console.error('Error fetching leaderboard:', err);
  }
}

fetchServerStatus();
fetchLeaderboard();
setInterval(fetchServerStatus, 10000);
setInterval(fetchLeaderboard, 30000);
