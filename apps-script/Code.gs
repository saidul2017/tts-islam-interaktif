/**
 * ══════════════════════════════════════════════════════════════
 * TTS INTERAKTIF — Google Apps Script Backend
 * ══════════════════════════════════════════════════════════════
 * 
 * CARA SETUP:
 * 1. Buka https://sheets.google.com → Buat spreadsheet baru
 * 2. Rename Sheet1 menjadi "Skor"
 * 3. Tambahkan header di baris 1:
 *    A1: Timestamp | B1: Nama | C1: NIM | D1: Puzzle | E1: Skor 
 *    F1: Waktu | G1: Hint | H1: Total Kata | I1: Kata Benar
 * 4. Buka Extensions → Apps Script
 * 5. Hapus semua kode, paste seluruh file ini
 * 6. Klik Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7. Klik Deploy → Copy URL
 * 8. Paste URL ke variabel SCRIPT_URL di index.html
 * 
 * PENTING: Setiap kali edit kode, buat deployment BARU
 * (Deploy → New deployment, bukan Manage deployments)
 * ══════════════════════════════════════════════════════════════
 */

// === POST: Simpan skor baru ===
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Skor");
    
    if (!sheet) {
      // Auto-create sheet if not exists
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Skor");
      sheet.appendRow(["Timestamp", "Nama", "NIM", "Puzzle", "Skor", "Waktu", "Hint", "Total Kata", "Kata Benar"]);
    }
    
    // Validate required fields
    if (!data.nama || !data.puzzle) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: "Nama dan puzzle wajib diisi" })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Sanitize input (max 100 chars, strip HTML)
    var nama = String(data.nama || "").replace(/<[^>]*>/g, "").substring(0, 100);
    var nim = String(data.nim || "").replace(/<[^>]*>/g, "").substring(0, 30);
    var puzzle = String(data.puzzle || "").substring(0, 50);
    var skor = parseInt(data.skor) || 0;
    var waktu = String(data.waktu || "").substring(0, 10);
    var hints = parseInt(data.hints) || 0;
    var totalKata = parseInt(data.totalKata) || 0;
    var kataBenar = parseInt(data.kataBenar) || 0;
    
    // Append row
    sheet.appendRow([
      new Date(),      // Timestamp
      nama,            // Nama
      nim,             // NIM  
      puzzle,          // Puzzle (TTS I / TTS II)
      skor,            // Skor
      waktu,           // Waktu (MM:SS)
      hints,           // Jumlah hint
      totalKata,       // Total kata
      kataBenar        // Kata yang benar
    ]);
    
    // Return success with rank
    var allData = sheet.getDataRange().getValues();
    var samePuzzle = allData.filter(function(row, i) {
      return i > 0 && row[3] === puzzle;
    }).sort(function(a, b) {
      return b[4] - a[4]; // Sort by score descending
    });
    
    var rank = 1;
    for (var i = 0; i < samePuzzle.length; i++) {
      if (samePuzzle[i][1] === nama && samePuzzle[i][4] === skor) {
        rank = i + 1;
        break;
      }
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: true, 
        rank: rank,
        totalPlayers: samePuzzle.length,
        message: "Skor berhasil disimpan!" 
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// === GET: Ambil leaderboard ===
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Skor");
    
    if (!sheet || sheet.getLastRow() < 2) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: true, leaderboard: {} })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    var data = sheet.getDataRange().getValues();
    var puzzleFilter = (e && e.parameter && e.parameter.puzzle) || null;
    var limit = parseInt((e && e.parameter && e.parameter.limit) || "20");
    
    // Group by puzzle
    var byPuzzle = {};
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var puzzle = row[3];
      
      if (puzzleFilter && puzzle !== puzzleFilter) continue;
      
      if (!byPuzzle[puzzle]) byPuzzle[puzzle] = [];
      byPuzzle[puzzle].push({
        nama: row[1],
        nim: row[2],
        skor: row[4],
        waktu: row[5],
        hints: row[6],
        tanggal: Utilities.formatDate(new Date(row[0]), "Asia/Jakarta", "dd/MM/yyyy HH:mm")
      });
    }
    
    // Sort each puzzle by score DESC, then time ASC
    var leaderboard = {};
    for (var p in byPuzzle) {
      byPuzzle[p].sort(function(a, b) {
        if (b.skor !== a.skor) return b.skor - a.skor;
        // Parse time for secondary sort
        var tA = a.waktu.split(":"), tB = b.waktu.split(":");
        var secA = parseInt(tA[0]) * 60 + parseInt(tA[1]);
        var secB = parseInt(tB[0]) * 60 + parseInt(tB[1]);
        return secA - secB;
      });
      leaderboard[p] = byPuzzle[p].slice(0, limit);
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, leaderboard: leaderboard })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
