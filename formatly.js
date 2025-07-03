// Formatly Modern Modal Editor
(function(){
  var formatlyModal, formatlyEditor, formatlyToolbar, formatlySaveBtn, formatlyCancelBtn, formatlyOverlay;
  var onSaveCallback = function(){};

  function createSVG(icon) {
    // Basit SVG ikonlar
    var icons = {
      bold: '<svg width="18" height="18" viewBox="0 0 18 18"><text x="3" y="15" font-size="14" font-weight="bold">B</text></svg>',
      italic: '<svg width="18" height="18" viewBox="0 0 18 18"><text x="5" y="15" font-size="14" font-style="italic">I</text></svg>',
      underline: '<svg width="18" height="18" viewBox="0 0 18 18"><text x="2" y="15" font-size="14" text-decoration="underline">U</text></svg>',
      strikethrough: '<svg width="18" height="18" viewBox="0 0 18 18"><line x1="3" y1="9" x2="15" y2="9" stroke="#222" stroke-width="2"/><text x="3" y="15" font-size="14">S</text></svg>',
      superscript: '<svg width="18" height="18" viewBox="0 0 18 18"><text x="2" y="10" font-size="10">x</text><text x="10" y="7" font-size="8">2</text></svg>',
      subscript: '<svg width="18" height="18" viewBox="0 0 18 18"><text x="2" y="15" font-size="10">x</text><text x="10" y="18" font-size="8">2</text></svg>',
      fontcolor: '<svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="14" width="14" height="3" fill="#e53e3e"/><text x="3" y="13" font-size="13">A</text></svg>',
      backcolor: '<svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="14" width="14" height="3" fill="#facc15"/><text x="3" y="13" font-size="13">A</text></svg>',
      font: '<svg width="18" height="18" viewBox="0 0 18 18"><text x="2" y="15" font-size="13" font-family="serif">F</text></svg>',
      fontsize: '<svg width="18" height="18" viewBox="0 0 18 18"><text x="2" y="15" font-size="10">A</text><text x="10" y="15" font-size="15">A</text></svg>',
      uppercase: '<svg width="18" height="18" viewBox="0 0 18 18"><text x="2" y="15" font-size="13">ABC</text></svg>',
      lowercase: '<svg width="18" height="18" viewBox="0 0 18 18"><text x="2" y="15" font-size="13">abc</text></svg>',
      capitalize: '<svg width="18" height="18" viewBox="0 0 18 18"><text x="2" y="15" font-size="13">Abc</text></svg>',
      alignleft: '<svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="5" width="14" height="2" fill="#222"/><rect x="2" y="10" width="8" height="2" fill="#222"/></svg>',
      aligncenter: '<svg width="18" height="18" viewBox="0 0 18 18"><rect x="5" y="5" width="8" height="2" fill="#222"/><rect x="2" y="10" width="14" height="2" fill="#222"/></svg>',
      alignright: '<svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="5" width="14" height="2" fill="#222"/><rect x="8" y="10" width="8" height="2" fill="#222"/></svg>',
      alignjustify: '<svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="5" width="14" height="2" fill="#222"/><rect x="2" y="10" width="14" height="2" fill="#222"/></svg>',
      removeformat: '<svg width="18" height="18" viewBox="0 0 18 18"><line x1="3" y1="15" x2="15" y2="3" stroke="#e53e3e" stroke-width="2"/><text x="3" y="15" font-size="14">F</text></svg>',
      h1: '<svg width="18" height="18" viewBox="0 0 18 18"><text x="2" y="15" font-size="14" font-weight="bold">H1</text></svg>',
      h2: '<svg width="18" height="18" viewBox="0 0 18 18"><text x="2" y="15" font-size="13" font-weight="bold">H2</text></svg>',
      h3: '<svg width="18" height="18" viewBox="0 0 18 18"><text x="2" y="15" font-size="12" font-weight="bold">H3</text></svg>',
      ol: '<svg width="18" height="18" viewBox="0 0 18 18"><text x="2" y="15" font-size="14">1.</text></svg>',
      ul: '<svg width="18" height="18" viewBox="0 0 18 18"><circle cx="6" cy="9" r="2"/><circle cx="6" cy="15" r="2"/></svg>',
      quote: '<svg width="18" height="18" viewBox="0 0 18 18"><text x="2" y="15" font-size="14">""</text></svg>',
      code: '<svg width="18" height="18" viewBox="0 0 18 18"><polyline points="7,5 3,9 7,13" stroke="#222" stroke-width="2" fill="none"/><polyline points="11,5 15,9 11,13" stroke="#222" stroke-width="2" fill="none"/></svg>',
      link: '<svg width="18" height="18" viewBox="0 0 18 18"><path d="M6 9a3 3 0 0 1 3-3h3a3 3 0 1 1 0 6h-3a3 3 0 1 1 0-6" stroke="#222" stroke-width="2" fill="none"/></svg>',
      image: '<svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="4" width="14" height="10" rx="2" fill="none" stroke="#222" stroke-width="2"/><circle cx="6" cy="8" r="1.5"/><polyline points="4,14 8,10 12,14" stroke="#222" stroke-width="2" fill="none"/></svg>'
    };
    return icons[icon] || '';
  }

  function buildModal() {
    // Modal overlay ve içerik
    formatlyOverlay = document.createElement('div');
    formatlyOverlay.className = 'formatly-modal-overlay';
    formatlyOverlay.innerHTML = `
      <div class="formatly-modal-card" role="dialog" aria-modal="true">
        <div class="formatly-toolbar"></div>
        <div class="formatly-editor" contenteditable="true" spellcheck="true"></div>
        <div class="formatly-modal-footer">
          <button class="formatly-help" title="Kullanım Rehberi">?</button>
          <button class="formatly-save">Kaydet</button>
          <button class="formatly-cancel">İptal</button>
        </div>
        <div class="formatly-resize-handle"></div>
      </div>
    `;
    document.body.appendChild(formatlyOverlay);
    formatlyModal = formatlyOverlay.querySelector('.formatly-modal-card');
    formatlyEditor = formatlyOverlay.querySelector('.formatly-editor');
    formatlyToolbar = formatlyOverlay.querySelector('.formatly-toolbar');
    formatlySaveBtn = formatlyOverlay.querySelector('.formatly-save');
    formatlyCancelBtn = formatlyOverlay.querySelector('.formatly-cancel');
    formatlyOverlay.style.display = 'none';
  }

  function buildToolbar() {
    // Araç çubuğu butonları ve gelişmiş inputlar
    var buttons = [
      {type:'dropdown', cmd:'fontName', icon:'font', title:'Yazı Tipi', options:['Arial','Times New Roman','Courier New','Georgia','Verdana','Tahoma']},
      {type:'input', cmd:'fontPx', icon:'fontsize', title:'Yazı Boyutu (px)'},
      {type:'dropdown', cmd:'lineHeight', icon:'', title:'Satır Aralığı', options:['1','1.2','1.5','2','2.5','3']},
      {type:'dropdown', cmd:'letterSpacing', icon:'', title:'Harf Aralığı', options:['0','0.5px','1px','2px','4px']},
      {cmd:'foreColor', icon:'fontcolor', title:'Yazı Rengi', palette:true},
      {cmd:'hiliteColor', icon:'backcolor', title:'Arka Plan Rengi', palette:true},
      {cmd:'bold', icon:'bold', title:'Kalın (Ctrl+B)'},
      {cmd:'italic', icon:'italic', title:'İtalik (Ctrl+I)'},
      {cmd:'underline', icon:'underline', title:'Altı Çizili (Ctrl+U)'},
      {cmd:'strikethrough', icon:'strikethrough', title:'Üstü Çizili'},
      {cmd:'superscript', icon:'superscript', title:'Üst Simge'},
      {cmd:'subscript', icon:'subscript', title:'Alt Simge'},
      {cmd:'formatBlock', value:'H1', icon:'h1', title:'Başlık 1'},
      {cmd:'formatBlock', value:'H2', icon:'h2', title:'Başlık 2'},
      {cmd:'formatBlock', value:'H3', icon:'h3', title:'Başlık 3'},
      {cmd:'insertOrderedList', icon:'ol', title:'Sıralı Liste'},
      {cmd:'insertUnorderedList', icon:'ul', title:'Sırasız Liste'},
      {cmd:'formatBlock', value:'BLOCKQUOTE', icon:'quote', title:'Alıntı'},
      {cmd:'formatBlock', value:'PRE', icon:'code', title:'Kod Bloğu'},
      {cmd:'createLink', icon:'link', title:'Bağlantı'},
      {cmd:'insertImage', icon:'image', title:'Görsel Ekle'},
      {cmd:'justifyLeft', icon:'alignleft', title:'Sola Hizala'},
      {cmd:'justifyCenter', icon:'aligncenter', title:'Ortala'},
      {cmd:'justifyRight', icon:'alignright', title:'Sağa Hizala'},
      {cmd:'justifyFull', icon:'alignjustify', title:'İki Yana Yasla'},
      {cmd:'removeFormat', icon:'removeformat', title:'Biçimi Temizle'},
      {cmd:'clearAll', icon:'removeformat', title:'Tümünü Temizle'},
      {cmd:'uppercase', icon:'uppercase', title:'BÜYÜK HARF'},
      {cmd:'lowercase', icon:'lowercase', title:'küçük harf'},
      {cmd:'capitalize', icon:'capitalize', title:'Baş Harf Büyük'},
      {type:'menu', cmd:'effects', icon:'', title:'Efektler'},
      {type:'menu', cmd:'shapes', icon:'', title:'Şekil Ekle'}
    ];
    formatlyToolbar.innerHTML = '';
    buttons.forEach(function(btn) {
      if(btn.type === 'dropdown') {
        var select = document.createElement('select');
        select.className = 'formatly-toolbar-select';
        select.title = btn.title;
        select.setAttribute('data-cmd', btn.cmd);
        btn.options.forEach(function(opt) {
          var option = document.createElement('option');
          option.value = opt;
          option.textContent = opt;
          select.appendChild(option);
        });
        formatlyToolbar.appendChild(select);
      } else if(btn.type === 'input' && btn.cmd === 'fontPx') {
        var wrap = document.createElement('span');
        wrap.className = 'formatly-toolbar-inputwrap';
        var input = document.createElement('input');
        input.type = 'number';
        input.min = 8;
        input.max = 120;
        input.value = 16;
        input.className = 'formatly-toolbar-input';
        input.title = btn.title;
        input.setAttribute('data-cmd', btn.cmd);
        var label = document.createElement('span');
        label.textContent = 'px';
        label.className = 'formatly-toolbar-pxlabel';
        wrap.appendChild(input);
        wrap.appendChild(label);
        formatlyToolbar.appendChild(wrap);
      } else if(btn.palette) {
        var colorBtn = document.createElement('button');
        colorBtn.type = 'button';
        colorBtn.className = 'formatly-toolbar-btn formatly-color-btn';
        colorBtn.title = btn.title;
        colorBtn.innerHTML = createSVG(btn.icon);
        colorBtn.setAttribute('data-cmd', btn.cmd);
        // Renk paleti popup
        var palette = document.createElement('div');
        palette.className = 'formatly-color-palette';
        var colors = ['#222','#e53e3e','#2563eb','#059669','#f59e42','#facc15','#fff','#f3f6fd','#000','#6d28d9','#be185d','#f472b6'];
        colors.forEach(function(c){
          var swatch = document.createElement('span');
          swatch.className = 'formatly-color-swatch';
          swatch.style.background = c;
          swatch.setAttribute('data-color', c);
          palette.appendChild(swatch);
        });
        colorBtn.appendChild(palette);
        formatlyToolbar.appendChild(colorBtn);
      } else {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'formatly-toolbar-btn';
        b.title = btn.title;
        b.innerHTML = createSVG(btn.icon);
        b.setAttribute('data-cmd', btn.cmd);
        if (btn.value) b.setAttribute('data-value', btn.value);
        formatlyToolbar.appendChild(b);
      }
    });
    // Toggle (expand/collapse) butonu ekle
    var toggleBtn = document.createElement('button');
    toggleBtn.className = 'formatly-toolbar-toggle';
    toggleBtn.title = 'Tüm araçları göster/gizle';
    toggleBtn.innerHTML = '<svg viewBox="0 0 18 18"><polyline points="4,7 9,12 14,7" stroke="#2563eb" stroke-width="2.5" fill="none"/></svg>';
    document.body.appendChild(toggleBtn);
    var expanded = false;
    toggleBtn.onclick = function() {
      expanded = !expanded;
      formatlyToolbar.classList.toggle('formatly-toolbar--expanded', expanded);
      formatlyToolbar.classList.toggle('formatly-toolbar--collapsed', !expanded);
      toggleBtn.innerHTML = expanded
        ? '<svg viewBox="0 0 18 18"><polyline points="4,11 9,6 14,11" stroke="#2563eb" stroke-width="2.5" fill="none"/></svg>'
        : '<svg viewBox="0 0 18 18"><polyline points="4,7 9,12 14,7" stroke="#2563eb" stroke-width="2.5" fill="none"/></svg>';
      if (expanded) {
        formatlyModal.classList.add('toolbar-expanded');
        var h = formatlyToolbar.scrollHeight;
        formatlyModal.style.setProperty('--formatly-toolbar-expanded-height', h + 'px');
      } else {
        formatlyModal.classList.remove('toolbar-expanded');
        formatlyModal.style.removeProperty('--formatly-toolbar-expanded-height');
      }
    };
    // Başlangıçta collapsed
    formatlyToolbar.classList.add('formatly-toolbar--collapsed');
    // Toggle butonunu modal ile hizala
    function positionToggleBtn() {
      var modalRect = formatlyModal.getBoundingClientRect();
      toggleBtn.style.top = (modalRect.top + 10) + 'px';
      toggleBtn.style.right = (window.innerWidth - modalRect.right + 32) + 'px';
    }
    window.addEventListener('resize', positionToggleBtn);
    positionToggleBtn();
    addToolbarTooltips(formatlyToolbar);
    addToolbarExpand(formatlyToolbar);
  }

  function exec(cmd, value) {
    if (cmd === 'clearAll') {
      formatlyEditor.innerText = formatlyEditor.innerText;
      return;
    }
    if (cmd === 'lineHeight') {
      var sel = window.getSelection();
      if (!sel.rangeCount) return;
      var range = sel.getRangeAt(0);
      if (range.collapsed) return;
      var span = document.createElement('span');
      span.style.lineHeight = value;
      span.textContent = range.toString();
      range.deleteContents();
      range.insertNode(span);
      formatlyEditor.focus();
      return;
    }
    if (cmd === 'letterSpacing') {
      var sel = window.getSelection();
      if (!sel.rangeCount) return;
      var range = sel.getRangeAt(0);
      if (range.collapsed) return;
      var span = document.createElement('span');
      span.style.letterSpacing = value;
      span.textContent = range.toString();
      range.deleteContents();
      range.insertNode(span);
      formatlyEditor.focus();
      return;
    }
    if (cmd === 'fontPx') {
      var sel = window.getSelection();
      if (!sel.rangeCount) return;
      var range = sel.getRangeAt(0);
      if (range.collapsed) return;
      var span = document.createElement('span');
      span.style.fontSize = value + 'px';
      span.textContent = range.toString();
      range.deleteContents();
      range.insertNode(span);
      formatlyEditor.focus();
      return;
    }
    if (cmd === 'createLink') {
      var url = prompt("Bağlantı URL'si girin:");
      if (url) document.execCommand('createLink', false, url);
    } else if (cmd === 'insertImage') {
      var img = prompt("Görsel URL'si girin:");
      if (img) document.execCommand('insertImage', false, img);
    } else if (cmd === 'fontName' || cmd === 'fontSize' || cmd === 'foreColor' || cmd === 'hiliteColor') {
      document.execCommand(cmd, false, value);
    } else if (cmd === 'uppercase' || cmd === 'lowercase' || cmd === 'capitalize') {
      // Seçili metni dönüştür
      var sel = window.getSelection();
      if (!sel.rangeCount) return;
      var range = sel.getRangeAt(0);
      var selectedText = range.toString();
      var newText = selectedText;
      if(cmd==='uppercase') newText = selectedText.toUpperCase();
      if(cmd==='lowercase') newText = selectedText.toLowerCase();
      if(cmd==='capitalize') newText = selectedText.replace(/\b\w/g, function(l){return l.toUpperCase();});
      range.deleteContents();
      range.insertNode(document.createTextNode(newText));
    } else if (cmd === 'removeFormat') {
      document.execCommand('removeFormat', false, null);
    } else if (cmd === 'formatBlock' && value) {
      document.execCommand('formatBlock', false, value);
    } else {
      document.execCommand(cmd, false, value);
    }
    formatlyEditor.focus();
  }

  function bindToolbarEvents() {
    formatlyToolbar.addEventListener('click', function(e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var cmd = btn.getAttribute('data-cmd');
      var value = btn.getAttribute('data-value') || null;
      if(btn.classList.contains('formatly-color-btn')) return; // Renk paleti için ayrı event
      exec(cmd, value);
    });
    formatlyToolbar.addEventListener('change', function(e) {
      if(e.target.classList.contains('formatly-toolbar-select')) {
        var cmd = e.target.getAttribute('data-cmd');
        var value = e.target.value;
        exec(cmd, value);
      }
      if(e.target.classList.contains('formatly-toolbar-input')) {
        var cmd = e.target.getAttribute('data-cmd');
        var value = e.target.value;
        exec(cmd, value);
      }
    });
    // Renk paleti event
    formatlyToolbar.addEventListener('mousedown', function(e) {
      if(e.target.classList.contains('formatly-color-btn')) {
        var palette = e.target.querySelector('.formatly-color-palette');
        palette.style.display = palette.style.display==='block' ? 'none' : 'block';
        e.preventDefault();
      } else if(e.target.classList.contains('formatly-color-swatch')) {
        var color = e.target.getAttribute('data-color');
        var btn = e.target.closest('button');
        var cmd = btn.getAttribute('data-cmd');
        exec(cmd, color);
        btn.querySelector('.formatly-color-palette').style.display = 'none';
        e.preventDefault();
      } else {
        // Diğer tıklamalarda paletleri kapat
        var palettes = formatlyToolbar.querySelectorAll('.formatly-color-palette');
        palettes.forEach(function(p){p.style.display='none';});
      }
    });
    // Klavye kısayolları
    formatlyEditor.addEventListener('keydown', function(e) {
      if (e.ctrlKey) {
        if (e.key === 'b' || e.key === 'B') { exec('bold'); e.preventDefault(); }
        if (e.key === 'i' || e.key === 'I') { exec('italic'); e.preventDefault(); }
        if (e.key === 'u' || e.key === 'U') { exec('underline'); e.preventDefault(); }
      }
    });
  }

  function bindModalEvents() {
    formatlySaveBtn.onclick = function() {
      onSaveCallback(formatlyEditor.innerHTML);
      close();
    };
    formatlyCancelBtn.onclick = close;
    // Modal dışına tıklayınca kapansın
    formatlyOverlay.addEventListener('mousedown', function(e) {
      if (e.target === formatlyOverlay) close();
    });
    // ESC ile kapama
    document.addEventListener('keydown', function(e) {
      if (formatlyOverlay.style.display === 'flex' && e.key === 'Escape') close();
    });
  }

  function open(html) {
    formatlyEditor.innerHTML = html || '';
    formatlyOverlay.style.display = 'flex';
    setTimeout(function(){ formatlyEditor.focus(); }, 100);
  }
  function close() {
    formatlyOverlay.style.display = 'none';
    formatlyEditor.blur();
  }

  function makeModalDraggable() {
    var isDragging = false, startX, startY, startLeft, startTop;
    var dragHandle = formatlyToolbar; // toolbar'dan sürükle
    dragHandle.style.cursor = 'move';
    dragHandle.addEventListener('mousedown', function(e) {
      if (window.innerWidth < 700) return; // mobilde devre dışı
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      var rect = formatlyModal.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;
      formatlyModal.style.transition = 'none';
      document.body.style.userSelect = 'none';
    });
    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      formatlyModal.style.position = 'fixed';
      formatlyModal.style.left = (startLeft + dx) + 'px';
      formatlyModal.style.top = (startTop + dy) + 'px';
      formatlyModal.style.margin = '0';
    });
    document.addEventListener('mouseup', function() {
      if (isDragging) {
        isDragging = false;
        formatlyModal.style.transition = '';
        document.body.style.userSelect = '';
      }
    });
  }

  function makeModalResizable() {
    var handle = formatlyModal.querySelector('.formatly-resize-handle');
    var isResizing = false, startX, startY, startW, startH;
    handle.addEventListener('mousedown', function(e) {
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      var rect = formatlyModal.getBoundingClientRect();
      startW = rect.width;
      startH = rect.height;
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });
    document.addEventListener('mousemove', function(e) {
      if (!isResizing) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      var newW = Math.max(320, Math.min(900, startW + dx));
      var newH = Math.max(220, Math.min(window.innerHeight-40, startH + dy));
      formatlyModal.style.width = newW + 'px';
      formatlyModal.style.height = newH + 'px';
      formatlyModal.style.maxWidth = 'none';
      formatlyModal.style.maxHeight = 'none';
    });
    document.addEventListener('mouseup', function() {
      if (isResizing) {
        isResizing = false;
        document.body.style.userSelect = '';
      }
    });
  }


  // Yardım modalı (readme)
  function showHelpModal() {
    var helpModal = document.createElement('div');
    helpModal.className = 'formatly-help-modal';
    helpModal.innerHTML = `
      <div class="formatly-help-content">
        <h2>Formatly – Modern Modal Editör</h2>
        <div class="formatly-help-intro">
          <b>Formatly</b> ile Word benzeri, mat mavi temalı, responsive ve tamamen bağımsız bir modal editör deneyimi yaşayın.<br>
          <b>Özellikler:</b> Gelişmiş tipografi, metin efektleri, şekil ekleme, satır/harf aralığı, tümünü temizle, ve daha fazlası.<br>
          <b>Kullanım:</b> Araç çubuğundaki butonlar ile metninizi dilediğiniz gibi biçimlendirin. "?" ile bu rehberi tekrar açabilirsiniz.
        </div>
        <div class="formatly-help-list"></div>
        <div class="formatly-help-readme">
          <p>Geliştirici: <a href='https://kenyoste.com' target='_blank'>kenyoste.com</a> <br> Proje: <a href='https://kenyoste.com/formatly' target='_blank'>kenyoste.com/formatly</a></p>
          <p>Teşekkürler! Formatly'yi kullandığınız için minnettarız. Her türlü öneri ve katkı için iletişime geçebilirsiniz.</p>
        </div>
        <button class="formatly-help-close" title="Kapat">×</button>
      </div>
    `;
    document.body.appendChild(helpModal);
    // Buton açıklamaları
    var helpList = helpModal.querySelector('.formatly-help-list');
    var btns = [
      {icon:'font', desc:'Yazı Tipi seç'},
      {icon:'fontsize', desc:'Yazı boyutunu px olarak ayarla'},
      {icon:'lineHeight', desc:'Satır aralığı'},
      {icon:'letterSpacing', desc:'Harf aralığı'},
      {icon:'fontcolor', desc:'Yazı rengi seç'},
      {icon:'backcolor', desc:'Arka plan rengi seç'},
      {icon:'bold', desc:'Kalın'},
      {icon:'italic', desc:'İtalik'},
      {icon:'underline', desc:'Altı çizili'},
      {icon:'strikethrough', desc:'Üstü çizili'},
      {icon:'superscript', desc:'Üst simge'},
      {icon:'subscript', desc:'Alt simge'},
      {icon:'formatBlock', desc:'Başlık 1-2-3'},
      {icon:'insertOrderedList', desc:'Sıralı liste'},
      {icon:'insertUnorderedList', desc:'Sırasız liste'},
      {icon:'quote', desc:'Alıntı'},
      {icon:'code', desc:'Kod bloğu'},
      {icon:'createLink', desc:'Bağlantı ekle'},
      {icon:'insertImage', desc:'Görsel ekle'},
      {icon:'justifyLeft', desc:'Sola hizala'},
      {icon:'justifyCenter', desc:'Ortala'},
      {icon:'justifyRight', desc:'Sağa hizala'},
      {icon:'justifyFull', desc:'İki yana yasla'},
      {icon:'removeformat', desc:'Biçimi temizle'},
      {icon:'clearAll', desc:'Tümünü temizle'},
      {icon:'uppercase', desc:'Tümünü büyük harf yap'},
      {icon:'lowercase', desc:'Tümünü küçük harf yap'},
      {icon:'capitalize', desc:'Baş harfleri büyük yap'},
      {icon:'effects', desc:'Metin efektleri'},
      {icon:'shapes', desc:'Şekil ekle'}
    ];
    helpList.innerHTML = btns.map(b => `<div class="formatly-help-row"><span class="formatly-help-icon">${createSVG(b.icon)}</span> <span>${b.desc}</span></div>`).join('');
    helpModal.querySelector('.formatly-help-close').onclick = function(){
      helpModal.remove();
    };
    helpModal.onclick = function(e){ if(e.target===helpModal) helpModal.remove(); };
  }

  function bindHelpButton() {
    var helpBtn = formatlyModal.querySelector('.formatly-help');
    if(helpBtn) helpBtn.onclick = showHelpModal;
  }

  window.Formatly = {
    init: function(opts) {
      if (!formatlyOverlay) {
        buildModal();
        buildToolbar();
        bindToolbarEvents();
        bindModalEvents();
        makeModalDraggable();
        makeModalResizable();
        bindHelpButton();
        smartTooltip();
      }
      var trigger = document.querySelector(opts.trigger);
      if (trigger) {
        trigger.addEventListener('click', function(){
          open(opts.initialValue || '');
        });
      }
      onSaveCallback = opts.onSave || function(){};
    }
  };

  document.addEventListener("DOMContentLoaded", function() {
    // id'si formatly olan input, textarea ve contenteditable div'leri bul
    const formatlyElements = document.querySelectorAll('input#formatly, textarea#formatly, div#formatly[contenteditable]');

    formatlyElements.forEach(el => {
      // Sağ üst köşeye logo ekle (SVG olarak)
      const logoWrapper = document.createElement('span');
      logoWrapper.className = 'formatly-logo';
      logoWrapper.innerHTML = `
       <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="500" height="500">
<path d="M0 0 C2.73155711 0.00518185 5.46302666 -0.00223803 8.19457471 -0.00947207 C14.63694573 -0.02632943 21.07907894 -0.02304107 27.52144384 -0.00618243 C34.14180842 0.01081843 40.76151739 -0.00523575 47.38181078 -0.03740531 C53.10374427 -0.06414362 58.82547413 -0.07136863 64.54746377 -0.06289023 C67.9491477 -0.05798471 71.35043551 -0.06004978 74.752069 -0.08067775 C78.53521996 -0.09811568 82.31696263 -0.08358944 86.10005713 -0.06086993 C87.21185843 -0.07256213 88.32365973 -0.08425433 89.46915197 -0.09630084 C96.2638741 -0.01336875 101.00416611 1.0130825 106.19722509 5.57023358 C110.29575512 10.27831122 110.77431311 14.84115799 110.51363134 20.98820233 C109.88411165 26.12539388 108.03329836 28.75273972 104.38472509 32.32023358 C97.79821021 36.96953821 91.66181112 36.86017689 83.87447119 36.84147382 C82.74194921 36.84670056 81.60942724 36.85192731 80.44258642 36.85731244 C77.98724135 36.86753984 75.53187467 36.87333064 73.076509 36.87519383 C69.18285832 36.87886296 65.28946109 36.89560682 61.39586401 36.91595197 C51.72122039 36.96501307 42.04652906 36.99593917 32.37178564 37.01725507 C24.20094343 37.03528849 16.03033127 37.06480682 7.85959768 37.11129689 C5.2849889 37.12290265 2.71034804 37.12887685 0.1357131 37.12897801 C-3.47759752 37.12917141 -7.0904196 37.1475374 -10.70365381 37.16959882 C-11.75447138 37.16502164 -12.80528894 37.16044446 -13.88794947 37.15572858 C-31.92720911 37.32964733 -48.44376052 44.31546096 -61.49027491 56.69523358 C-72.18440546 67.87754128 -80.90155254 83.43923715 -80.93699598 99.313411 C-80.94145383 100.24418238 -80.94591167 101.17495375 -80.9505046 102.13393033 C-80.95032024 103.14801752 -80.95013588 104.16210471 -80.94994593 105.20692182 C-80.95362261 106.29091893 -80.9572993 107.37491605 -80.96108741 108.49176157 C-80.97211712 112.13104218 -80.97596694 115.77029423 -80.97977686 119.40958905 C-80.98604217 122.01649814 -80.99268903 124.62340633 -80.99968958 127.23031354 C-81.01942926 135.05929027 -81.02951829 142.88826825 -81.03841737 150.71726364 C-81.04280548 154.40922254 -81.04817103 158.10118001 -81.05340624 161.79313779 C-81.07041812 174.07580192 -81.08490963 186.35846517 -81.09215498 198.64113927 C-81.09406471 201.82681395 -81.09598506 205.01248862 -81.09794092 208.19816327 C-81.09866653 209.38576124 -81.09866653 209.38576124 -81.0994068 210.59735109 C-81.10769715 223.40683328 -81.13301738 236.21622179 -81.1655216 249.02566312 C-81.19866223 262.19393021 -81.21661016 275.36214982 -81.21979922 288.53045881 C-81.22195815 295.91696419 -81.23061555 303.30333307 -81.2562604 310.68979764 C-81.28035366 317.64523681 -81.28374928 324.60042749 -81.27349901 331.55589986 C-81.27300501 334.10067745 -81.27928514 336.64546734 -81.29305506 339.19020772 C-81.40956229 362.00894791 -78.74115076 382.25394616 -62.14261866 399.36320233 C-42.48056823 417.90920983 -21.88687467 420.17983381 3.99410009 420.08781171 C6.57145599 420.09324096 9.14880877 420.1003681 11.72615576 420.10905194 C17.96450591 420.12672047 24.20266218 420.1230498 30.44101954 420.11140138 C35.51679384 420.10232092 40.59251431 420.10116284 45.66829443 420.10549664 C46.75715637 420.10641604 46.75715637 420.10641604 47.86801553 420.10735402 C49.3432673 420.10863308 50.81851905 420.10992994 52.29377079 420.11124438 C66.08611342 420.12261599 79.87834922 420.10959042 93.67067432 420.08804291 C105.47254676 420.07017503 117.27426175 420.07328011 129.07613134 420.09171796 C142.82339199 420.1131854 156.57055931 420.12151767 170.31783438 420.1092689 C171.78727482 420.10799488 173.25671528 420.10673739 174.72615576 420.10549664 C175.44890967 420.10487954 176.17166358 420.10426244 176.91631913 420.10362664 C181.97852403 420.1001913 187.04066911 420.1059626 192.10286474 420.11541486 C198.93209118 420.12788782 205.76101755 420.11884742 212.59021521 420.09583783 C215.08619209 420.09058001 217.58219412 420.09201386 220.07816076 420.10088849 C243.27622293 420.1757232 263.74323939 417.38938134 281.18892431 400.77457929 C294.35826425 387.59845802 301.46377521 370.14510878 301.5895133 351.55320477 C301.58179403 350.50912457 301.57407476 349.46504437 301.56612158 348.38932538 C301.56988806 347.24935605 301.57365454 346.10938672 301.57753515 344.93487287 C301.58391987 342.48563891 301.58368303 340.03638013 301.57735014 337.58714604 C301.56817009 333.70657069 301.57854074 329.82647127 301.59396887 325.94592023 C301.62990622 316.31800243 301.63639159 306.69009486 301.6338706 297.06211591 C301.63200653 288.90144021 301.6458956 280.74112811 301.68234968 272.58052754 C301.69315478 268.76488704 301.6810607 264.94974641 301.66852331 261.13412213 C301.67742751 258.79079946 301.68750181 256.44748084 301.69893408 254.10416913 C301.68919058 253.04996778 301.67944708 251.99576642 301.66940832 250.90961957 C301.73697767 243.95974588 302.74353894 238.19534059 307.67989779 233.01396966 C312.71959437 228.60778508 316.95962503 228.21626938 323.40425634 228.29288983 C327.71693523 228.72114186 329.76091665 229.90534132 333.19722509 232.57023358 C336.77302303 237.18113092 338.31803955 240.67223903 338.33766699 246.46165204 C338.34337713 247.47062543 338.34908728 248.47959882 338.35497046 249.51914716 C338.35608831 250.62558576 338.35720617 251.73202435 338.35835791 252.8719914 C338.36332281 254.03827069 338.36828772 255.20454999 338.37340307 256.40617108 C338.38551714 259.6093837 338.39297313 262.81255979 338.39741373 266.01579118 C338.40034937 268.02286106 338.40445543 270.02992529 338.4089179 272.03699231 C338.42260146 278.33265182 338.43225986 284.62829831 338.43611979 290.92397165 C338.44058129 298.15943916 338.45803595 305.39471594 338.48712039 312.63012552 C338.50887464 318.23971969 338.51883159 323.84926081 338.52016091 329.45889664 C338.52120062 332.80006961 338.52841246 336.1409224 338.54498053 339.48207593 C338.66741126 366.0886225 338.66741126 366.0886225 335.19722509 378.57023358 C334.9091876 379.69881787 334.9091876 379.69881787 334.61533117 380.85020185 C330.80119477 394.97383346 323.84945881 407.63348208 314.19722509 418.57023358 C313.49855322 419.40038983 312.79988134 420.23054608 312.08003759 421.08585858 C294.59105572 441.37556709 269.87100487 454.13712781 243.19722509 456.57023358 C239.5481497 456.71106993 235.90267622 456.71383913 232.25119543 456.71067548 C230.62959687 456.71513216 230.62959687 456.71513216 228.97523874 456.71967888 C225.36376077 456.72832922 221.7523161 456.72987104 218.14082861 456.7313664 C215.54657436 456.73599724 212.95232078 456.74102226 210.35806799 456.74641156 C203.31630425 456.75995579 196.27454623 456.7660138 189.23277164 456.77042222 C184.82842928 456.7731919 180.4240891 456.77743061 176.01974821 456.78192639 C163.80473389 456.79411513 151.58972129 456.80441446 139.37470102 456.80780149 C138.20346042 456.80813083 138.20346042 456.80813083 137.00855839 456.80846684 C136.22594983 456.80868511 135.44334128 456.80890339 134.63701731 456.80912828 C133.05137368 456.80957174 131.46573005 456.8100183 129.88008642 456.81046796 C129.09356618 456.81068939 128.30704594 456.81091082 127.49669176 456.81113896 C114.76960132 456.81508186 102.04256831 456.83252211 89.31550003 456.85582748 C76.22170872 456.87960904 63.12794614 456.89200646 50.0341329 456.8931694 C42.69346656 456.89408248 35.35287503 456.89974122 28.01222944 456.91798902 C21.10027437 456.93511156 14.18846276 456.93659206 7.2764926 456.92785001 C4.75029511 456.92708323 2.22408981 456.93137445 -0.30208826 456.94130826 C-34.86071006 457.06915126 -63.72601912 449.21700385 -88.80277491 424.57023358 C-106.64358893 406.78552275 -117.90995596 381.38708507 -118.07958591 356.08899659 C-118.07648871 355.07108712 -118.0733915 354.05317764 -118.07020044 353.00442243 C-118.07473156 351.89291414 -118.07926267 350.78140586 -118.08393109 349.63621551 C-118.09651525 345.93961781 -118.09495857 342.24316858 -118.09330225 338.54655194 C-118.09929131 335.8845083 -118.10604199 333.22247596 -118.11365747 330.56043744 C-118.13020694 324.09552653 -118.1357643 317.6306521 -118.13688223 311.16572177 C-118.13783576 305.90440575 -118.14196123 300.64310168 -118.14828348 295.38178945 C-118.16588081 280.4308097 -118.17512493 265.47985855 -118.17362253 250.52886837 C-118.17354262 249.72436703 -118.17346271 248.9198657 -118.17338037 248.09098554 C-118.17325773 246.88274194 -118.17325773 246.88274194 -118.17313261 245.65008939 C-118.17232055 232.61021551 -118.19144198 219.57045737 -118.21965711 206.53061693 C-118.24846903 193.10788627 -118.26219279 179.68521189 -118.26046956 166.26244956 C-118.25980843 158.74013115 -118.26517808 151.21793403 -118.28682566 143.69564366 C-118.30514744 137.28846211 -118.30929568 130.88145678 -118.29580681 124.4742602 C-118.28933143 121.21315886 -118.29118661 117.95246019 -118.30651331 114.69137883 C-118.43654799 85.08713888 -112.36993687 55.55115405 -90.80277491 33.57023358 C-90.14277491 33.57023358 -89.48277491 33.57023358 -88.80277491 33.57023358 C-88.58234522 33.00820233 -88.36191553 32.44617108 -88.13480616 31.86710858 C-81.55469277 20.5207547 -65.24515596 12.81451991 -53.61527491 7.82023358 C-53.00595118 7.55057782 -52.39662745 7.28092206 -51.76883936 7.00309491 C-34.99222145 0.17503457 -17.8504088 -0.04933582 0 0 Z " fill="#000000" transform="translate(118.80277490615845,43.42976641654968)"/>
<path d="M0 0 C3.49750187 2.84620753 6.78184663 5.84277552 10 9 C10.92232422 9.88558594 10.92232422 9.88558594 11.86328125 10.7890625 C27.06198051 26.65161299 31.66990607 47.82061797 31.3359375 69.109375 C30.14966981 99.16802567 10.74562404 118.56154292 -9.32851505 138.64860058 C-11.83513574 141.15896279 -14.33605529 143.67499524 -16.83782959 146.19018555 C-22.29091132 151.67025648 -27.75138259 157.14292304 -33.21355438 162.61393166 C-36.62774593 166.03367101 -40.04046958 169.4548727 -43.45294189 172.87632751 C-52.91509934 182.36283333 -62.37912138 191.84747015 -71.85006714 201.32520294 C-72.7564388 202.2322333 -72.7564388 202.2322333 -73.68112099 203.1575875 C-74.58953187 204.06665321 -74.58953187 204.06665321 -75.51629448 204.99408388 C-76.74328797 206.22196428 -77.97027834 207.44984778 -79.19726562 208.67773438 C-79.80588196 209.28679357 -80.4144983 209.89585276 -81.04155755 210.5233683 C-90.92026647 220.40998688 -100.78537371 230.31006031 -110.64475846 240.21594626 C-120.78472054 250.4033442 -130.93590577 260.5794452 -141.0984478 270.74431944 C-146.79741574 276.44511893 -152.49147442 282.15063552 -158.17315674 287.8686676 C-163.00584891 292.73217182 -167.8487092 297.58525615 -172.70508337 302.42511803 C-175.1807193 304.89294806 -177.65129026 307.36533599 -180.10894012 309.85108948 C-182.77820799 312.54572044 -185.46532449 315.22120113 -188.15771484 317.8927002 C-188.92689554 318.6779937 -189.69607624 319.46328721 -190.48856544 320.27237749 C-196.54879216 326.22318294 -202.41126932 328.84774704 -210.84934998 329.79182434 C-211.69709991 329.89139435 -212.54484985 329.99096436 -213.41828918 330.09355164 C-214.31464584 330.18876602 -215.2110025 330.28398041 -216.13452148 330.38208008 C-217.10488342 330.49302002 -218.07524536 330.60395996 -219.07501221 330.71826172 C-222.2559859 331.07894596 -225.43833694 331.42496285 -228.62109375 331.76953125 C-230.84876665 332.01623014 -233.07639148 332.26336344 -235.30397034 332.51091003 C-239.96242731 333.02604992 -244.62164897 333.53346786 -249.28149414 334.03588867 C-255.23591757 334.67886795 -261.18751942 335.34479682 -267.13870144 336.01703358 C-271.73507606 336.53299195 -276.33291714 337.03477789 -280.93129158 337.53256798 C-283.12572935 337.77219189 -285.31965023 338.01660199 -287.51299858 338.26600075 C-290.58597211 338.61365048 -293.66046356 338.94161597 -296.73608398 339.26489258 C-298.07758263 339.42289589 -298.07758263 339.42289589 -299.44618225 339.58409119 C-306.56041564 340.2989765 -313.54160703 339.95474385 -319.875 336.375 C-325.39872627 330.20142358 -326.30693156 325.07331238 -326 317 C-325.71511774 313.77390204 -325.28780866 310.57554778 -324.83837891 307.36865234 C-324.71479507 306.45199295 -324.59121124 305.53533356 -324.46388245 304.59089661 C-324.05743532 301.58839283 -323.64228023 298.58717062 -323.2265625 295.5859375 C-322.93951021 293.48569851 -322.65284442 291.38540667 -322.36654663 289.2850647 C-321.76679051 284.89523075 -321.16278409 280.5060089 -320.55566406 276.1171875 C-319.77916116 270.50182402 -319.01264977 264.88515133 -318.24923134 259.26799583 C-317.65934704 254.93513135 -317.06449584 250.60296005 -316.46812057 246.27098465 C-316.18360941 244.20040358 -315.90055554 242.12962172 -315.61900711 240.05863571 C-315.22446334 237.16256277 -314.82331122 234.26747911 -314.42041016 231.37255859 C-314.30604111 230.52354477 -314.19167206 229.67453094 -314.07383728 228.79978943 C-313.75340934 226.52528204 -313.38519427 224.26429893 -313 222 C-312.82632904 220.85794098 -312.65265808 219.71588196 -312.47372437 218.53921509 C-308.83214016 209.79378746 -299.98106863 202.83157265 -293.34321594 196.1893158 C-292.52052646 195.36224406 -291.69783698 194.53517233 -290.85021752 193.68303782 C-288.59623383 191.41811445 -286.34010645 189.15535412 -284.08295214 186.89359128 C-281.63734955 184.44196641 -279.19453772 181.98756298 -276.75126648 179.53361511 C-270.86889935 173.6268881 -264.98173007 167.72495927 -259.09364465 161.82393321 C-257.4277745 160.15434145 -255.7620299 158.48462452 -254.0963285 156.8148644 C-243.72474674 146.41805497 -233.35156334 136.02284638 -222.97359943 125.63240719 C-220.57783886 123.23371761 -218.18209469 120.83501165 -215.78637695 118.4362793 C-215.19103463 117.84019092 -214.5956923 117.24410255 -213.9823093 116.62995089 C-204.3359978 106.97098226 -194.70002373 97.3017682 -185.06822715 87.62832766 C-175.15349246 77.67108114 -165.22926832 67.72337112 -155.29586285 57.78475004 C-149.7291307 52.21461616 -144.16657494 46.64045021 -138.61470985 41.05549431 C-133.8882481 36.30090458 -129.15321726 31.55505798 -124.40710268 26.8200826 C-121.99083284 24.40896529 -119.58017336 21.99289399 -117.1775856 19.56809998 C-85.31815085 -12.56956846 -40.40089968 -29.56018906 0 0 Z M-75.7421875 30.15625 C-79.59864427 33.66635916 -83.31166127 37.31474431 -87 41 C-88.05821219 42.04465749 -89.11678033 43.08895458 -90.17578125 44.1328125 C-92.46627297 46.40710555 -94.74166749 48.69384397 -97 51 C-91.31978209 57.94103433 -84.94998244 64.17673906 -78.6015625 70.49609375 C-77.39922532 71.69656287 -76.19711095 72.89725518 -74.99520874 74.09815979 C-71.85090837 77.23866548 -68.70361521 80.37615481 -65.55566406 83.51300049 C-62.33605827 86.72232618 -59.11932679 89.93453005 -55.90234375 93.14648438 C-49.60435365 99.43379102 -43.30319435 105.71791106 -37 112 C-33.21090048 110.25364969 -30.91947504 107.99068175 -28 105 C-27.21625 104.401875 -26.4325 103.80375 -25.625 103.1875 C-21.97213868 100.1434489 -19.04039254 96.64328488 -16 93 C-15.38511719 92.29617187 -14.77023437 91.59234375 -14.13671875 90.8671875 C-6.66319944 81.93737214 -3.44171115 71.73068729 -4.18359375 60.12890625 C-5.32225795 51.10176433 -8.98441261 43.52338109 -14 36 C-14.66 36 -15.32 36 -16 36 C-16.2578125 35.40058594 -16.515625 34.80117188 -16.78125 34.18359375 C-20.39418236 27.71042326 -29.30146038 23.52614418 -36 21 C-50.73320094 17.133451 -64.18586376 20.07030163 -75.7421875 30.15625 Z M-128.9440918 82.4402771 C-129.57154675 83.02666037 -130.19900169 83.61304364 -130.84547043 84.21719611 C-132.96637882 86.20201481 -135.08306682 88.1912638 -137.19921875 90.18115234 C-137.93890459 90.87537607 -138.67859043 91.5695998 -139.44069099 92.28486061 C-154.17571729 106.12073194 -168.7386743 120.13300933 -183.24429321 134.20886803 C-192.47144558 143.15564278 -201.74388762 152.04213577 -211.15283203 160.79785156 C-266.26243906 209.2572121 -266.26243906 209.2572121 -287.71698952 276.35382557 C-287.9088237 282.8234462 -287.71178995 289.23413626 -287.18319702 295.68288612 C-287 298 -287 298 -287 301 C-274.04618693 300.2928575 -261.13956682 299.07648909 -248.23657227 297.74560547 C-245.77582839 297.49738903 -243.3138469 297.26116502 -240.85083008 297.03662109 C-237.2524695 296.70713495 -233.66003539 296.33818222 -230.06640625 295.9609375 C-228.97356827 295.86896088 -227.88073029 295.77698425 -226.754776 295.68222046 C-218.95635607 294.8029583 -215.31869153 292.62067714 -210 287 C-208.96428123 285.97136527 -207.92459443 284.94671783 -206.88200378 283.92504883 C-203.71690561 280.81538743 -200.58220082 277.67679201 -197.45444679 274.52961159 C-195.35874113 272.42102108 -193.25982127 270.31567671 -191.16007996 268.21110535 C-186.70805654 263.7477192 -182.25999437 259.28039848 -177.8125 254.8125 C-172.64500966 249.62136364 -167.47588412 244.43187748 -162.30252647 239.24658775 C-160.23931772 237.17691882 -158.17915377 235.10425182 -156.11909485 233.03144836 C-154.85143636 231.76015665 -153.58363688 230.48900552 -152.31567383 229.21801758 C-151.46382004 228.35841431 -151.46382004 228.35841431 -150.59475708 227.48144531 C-148.17398071 225.06034926 -145.80977406 222.85124676 -143.10527039 220.7363739 C-142.06316154 219.87686882 -142.06316154 219.87686882 -141 219 C-141 218.34 -141 217.68 -141 217 C-140.34 217 -139.68 217 -139 217 C-137.33333333 215.66666667 -137.33333333 215.66666667 -136 214 C-136 213.34 -136 212.68 -136 212 C-135.34 212 -134.68 212 -134 212 C-132.69067123 210.70834637 -132.69067123 210.70834637 -131.28833008 208.91943359 C-125.39222668 201.99391199 -118.82597267 195.70334273 -112.38671875 189.2890625 C-110.96639944 187.87061151 -109.54630316 186.45193718 -108.12641907 185.03305054 C-104.40914614 181.31957386 -100.68887986 177.60911047 -96.96795654 173.89929199 C-93.17147525 170.11307338 -89.37785117 166.32399432 -85.58398438 162.53515625 C-78.93259348 155.89331179 -72.27876039 149.25392207 -65.62309265 142.61636353 C-64.08120642 141.07843276 -62.53990977 139.53990977 -61 138 C-68.93321588 130.04366499 -76.86909247 122.08999465 -84.80842495 114.13976288 C-88.49445891 110.44849914 -92.17955236 106.75630635 -95.86254883 103.06201172 C-99.41353344 99.50020157 -102.96691972 95.94080416 -106.52202034 92.38310242 C-107.88133537 91.02193253 -109.23976664 89.65987952 -110.59731865 88.29695129 C-112.49153718 86.39552677 -114.388808 84.49720088 -116.28686523 82.59960938 C-116.85366501 82.02921432 -117.42046478 81.45881927 -118.00444031 80.87113953 C-123.39466604 75.49531177 -123.87465826 77.67778543 -128.9440918 82.4402771 Z " fill="#000000" transform="translate(461,24)"/>
</svg>
      `;
      logoWrapper.style.cursor = 'pointer';
      logoWrapper.onclick = function(e) {
        e.stopPropagation();
        showFormatlyToolbarInline(el);
      };

      // Konteyner oluşturup input/textarea/div'in parent'ına ekle
      const wrapper = document.createElement('div');
      wrapper.className = 'formatly-wrapper';
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);
      wrapper.appendChild(logoWrapper);
    });
  });

  function showFormatlyToolbarInline(targetEl) {
    // Eğer inline toolbar zaten açıksa tekrar açma
    if (document.querySelector('.formatly-toolbar-inline')) return;

    // Toolbarı oluştur
    const wrapper = targetEl.parentNode;
    const toolbarDiv = document.createElement('div');
    toolbarDiv.className = 'formatly-toolbar-inline';
    toolbarDiv.style.width = '500px';
    toolbarDiv.style.display = 'flex';
    toolbarDiv.style.flexWrap = 'wrap';
    toolbarDiv.style.justifyContent = 'center';
    toolbarDiv.style.position = 'absolute';
    toolbarDiv.style.left = '0';
    toolbarDiv.style.top = '-56px';
    toolbarDiv.style.zIndex = '200';
    toolbarDiv.style.background = '#fff';
    toolbarDiv.style.borderRadius = '10px 10px 0 0';
    toolbarDiv.style.boxShadow = '0 2px 12px rgba(0,0,0,0.13)';
    toolbarDiv.style.padding = '6px 14px';
    toolbarDiv.style.gap = '8px';
    toolbarDiv.style.alignItems = 'center';
    toolbarDiv.style.overflow = 'visible';
    toolbarDiv.style.maxHeight = '56px';
    toolbarDiv.style.transition = 'max-height 0.18s';

    // Modalda olan tüm butonları ekle (buildToolbar'daki buttons dizisini tekrar tanımla)
    const buttons = [
      {type:'dropdown', cmd:'fontName', icon:'font', title:'Yazı Tipi', options:['Arial','Times New Roman','Courier New','Georgia','Verdana','Tahoma']},
      {type:'input', cmd:'fontPx', icon:'fontsize', title:'Yazı Boyutu (px)'},
      {type:'dropdown', cmd:'lineHeight', icon:'', title:'Satır Aralığı', options:['1','1.2','1.5','2','2.5','3']},
      {type:'dropdown', cmd:'letterSpacing', icon:'', title:'Harf Aralığı', options:['0','0.5px','1px','2px','4px']},
      {cmd:'foreColor', icon:'fontcolor', title:'Yazı Rengi', palette:true},
      {cmd:'hiliteColor', icon:'backcolor', title:'Arka Plan Rengi', palette:true},
      {cmd:'bold', icon:'<b>B</b>', title:'Kalın (Ctrl+B)'},
      {cmd:'italic', icon:'<i>I</i>', title:'İtalik (Ctrl+I)'},
      {cmd:'underline', icon:'<u>U</u>', title:'Altı Çizili (Ctrl+U)'},
      {cmd:'strikethrough', icon:'<s>S</s>', title:'Üstü Çizili'},
      {cmd:'superscript', icon:'x<sup>2</sup>', title:'Üst Simge'},
      {cmd:'subscript', icon:'x<sub>2</sub>', title:'Alt Simge'},
      {cmd:'formatBlock', value:'H1', icon:'<b>H1</b>', title:'Başlık 1'},
      {cmd:'formatBlock', value:'H2', icon:'<b>H2</b>', title:'Başlık 2'},
      {cmd:'formatBlock', value:'H3', icon:'<b>H3</b>', title:'Başlık 3'},
      {cmd:'insertOrderedList', icon:'1.', title:'Sıralı Liste'},
      {cmd:'insertUnorderedList', icon:'•', title:'Sırasız Liste'},
      {cmd:'formatBlock', value:'BLOCKQUOTE', icon:'""', title:'Alıntı'},
      {cmd:'formatBlock', value:'PRE', icon:'<code>&lt;/&gt;</code>', title:'Kod Bloğu'},
      {cmd:'createLink', icon:'<b>🔗</b>', title:'Bağlantı'},
      {cmd:'insertImage', icon:'<b>🖼️</b>', title:'Görsel Ekle'},
      {cmd:'justifyLeft', icon:'<b>=</b>', title:'Sola Hizala'},
      {cmd:'justifyCenter', icon:'<b>=</b>', title:'Ortala'},
      {cmd:'justifyRight', icon:'<b>=</b>', title:'Sağa Hizala'},
      {cmd:'justifyFull', icon:'<b>=</b>', title:'İki Yana Yasla'},
      {cmd:'removeFormat', icon:'<s>F</s>', title:'Biçimi Temizle'},
      {cmd:'clearAll', icon:'<s>F</s>', title:'Tümünü Temizle'},
      {cmd:'uppercase', icon:'AB', title:'BÜYÜK HARF'},
      {cmd:'lowercase', icon:'ab', title:'küçük harf'},
      {cmd:'capitalize', icon:'Ab', title:'Baş Harf Büyük'}
    ];
    buttons.forEach(btn => {
      if(btn.type === 'dropdown') {
        const select = document.createElement('select');
        select.className = 'formatly-toolbar-select';
        select.title = btn.title;
        select.setAttribute('data-cmd', btn.cmd);
        btn.options.forEach(function(opt) {
          var option = document.createElement('option');
          option.value = opt;
          option.textContent = opt;
          select.appendChild(option);
        });
        toolbarDiv.appendChild(select);
      } else if(btn.type === 'input' && btn.cmd === 'fontPx') {
        const wrap = document.createElement('span');
        wrap.className = 'formatly-toolbar-inputwrap';
        const input = document.createElement('input');
        input.type = 'number';
        input.min = 8;
        input.max = 120;
        input.value = 16;
        input.className = 'formatly-toolbar-input';
        input.title = btn.title;
        input.setAttribute('data-cmd', btn.cmd);
        const label = document.createElement('span');
        label.textContent = 'px';
        label.className = 'formatly-toolbar-pxlabel';
        wrap.appendChild(input);
        wrap.appendChild(label);
        toolbarDiv.appendChild(wrap);
      } else if(btn.palette) {
        const colorBtn = document.createElement('button');
        colorBtn.type = 'button';
        colorBtn.className = 'formatly-toolbar-btn formatly-color-btn';
        colorBtn.title = btn.title;
        colorBtn.innerHTML = btn.icon;
        colorBtn.setAttribute('data-cmd', btn.cmd);
        toolbarDiv.appendChild(colorBtn);
      } else {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'formatly-toolbar-btn';
        b.title = btn.title;
        b.innerHTML = btn.icon;
        b.setAttribute('data-cmd', btn.cmd);
        if (btn.value) b.setAttribute('data-value', btn.value);
        toolbarDiv.appendChild(b);
      }
    });

    // Gelişmiş Düzenle butonu yerine tam ekran ikonu
    const advBtn = document.createElement('button');
    advBtn.type = 'button';
    advBtn.className = 'formatly-adv-btn';
    advBtn.title = 'Tam Ekran Düzenle';
    advBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="6" height="2" rx="1" fill="#2563eb"/><rect x="3" y="3" width="2" height="6" rx="1" fill="#2563eb"/><rect x="13" y="3" width="6" height="2" rx="1" fill="#2563eb"/><rect x="17" y="3" width="2" height="6" rx="1" fill="#2563eb"/><rect x="3" y="17" width="6" height="2" rx="1" fill="#2563eb"/><rect x="3" y="13" width="2" height="6" rx="1" fill="#2563eb"/><rect x="13" y="17" width="6" height="2" rx="1" fill="#2563eb"/><rect x="17" y="13" width="2" height="6" rx="1" fill="#2563eb"/></svg>`;
    advBtn.onclick = function(e) {
      e.stopPropagation();
      toolbarDiv.remove();
      showFormatlyModalLive(targetEl);
    };
    toolbarDiv.insertBefore(advBtn, toolbarDiv.firstChild);

    // Wrapper'ın başına ekle
    wrapper.insertBefore(toolbarDiv, targetEl);

    // Toolbar yukarıya doğru genişlesin
    toolbarDiv.style.bottom = `calc(100% + 8px)`;
    toolbarDiv.style.top = 'auto';

    // Sığmayan butonları gizle (ilk 2 satır overflowed)
    setTimeout(() => {
      if (!toolbarDiv.classList.contains('formatly-toolbar--expanded')) {
        let toolbarRect = toolbarDiv.getBoundingClientRect();
        // Satırların top değerlerini topla
        let tops = [];
        toolbarDiv.childNodes.forEach(el => {
          if (el.nodeType !== 1) return;
          const rect = el.getBoundingClientRect();
          let relTop = Math.round(rect.top - toolbarRect.top);
          if (!tops.includes(relTop)) tops.push(relTop);
        });
        // İlk 2 satırın top değerlerini bul
        let allowedTops = tops.sort((a,b)=>a-b).slice(0,2);
        toolbarDiv.childNodes.forEach(el => {
          if (el.nodeType !== 1) return;
          const rect = el.getBoundingClientRect();
          let relTop = Math.round(rect.top - toolbarRect.top);
          if (!allowedTops.includes(relTop)) {
            el.classList.add('overflowed');
          } else {
            el.classList.remove('overflowed');
          }
        });
      }
    }, 50);

    // Toolbar dışında bir yere tıklanınca toolbarı kaldır
    setTimeout(() => {
      document.addEventListener('mousedown', function removeToolbar(e) {
        if (!toolbarDiv.contains(e.target) && e.target !== targetEl) {
          if (toolbarDiv.parentNode) toolbarDiv.remove();
          document.removeEventListener('mousedown', removeToolbar);
        }
      });
    }, 10);

    // Tooltip ve expand/collapse ekle
    addToolbarTooltips(toolbarDiv);
    addToolbarExpand(toolbarDiv, true);
  }

  function showFormatlyModalLive(targetEl) {
    // Eğer modal zaten açıksa tekrar açma
    if (document.querySelector('.formatly-modal-overlay') && document.querySelector('.formatly-modal-overlay').style.display !== 'none') return;

    // Formatly modalı ve editörü yoksa başlat
    if (!window.formatlyOverlay) {
      window.Formatly.init({});
    }

    // Modalı aç ve içeriği ayarla
    var overlay = document.querySelector('.formatly-modal-overlay');
    var editor = overlay.querySelector('.formatly-editor');
    overlay.style.display = 'flex';
    // İçeriği aktar
    if (targetEl.tagName.toLowerCase() === 'div') {
      editor.innerHTML = targetEl.innerHTML;
    } else {
      editor.innerHTML = targetEl.value || targetEl.innerText || '';
    }
    setTimeout(function(){ editor.focus(); }, 100);

    // Editörde yapılan değişiklikler anlık olarak input/textarea/div'e yansısın
    function syncToInput() {
      var newValue = editor.innerHTML;
      if (targetEl.tagName.toLowerCase() === 'input' || targetEl.tagName.toLowerCase() === 'textarea') {
        targetEl.value = newValue;
      } else {
        targetEl.innerHTML = newValue;
      }
    }
    editor.addEventListener('input', syncToInput);

    // Modal kapatılınca event kaldır
    var closeModal = function() {
      overlay.style.display = 'none';
      editor.removeEventListener('input', syncToInput);
    };
    var saveBtn = overlay.querySelector('.formatly-save');
    if (saveBtn) saveBtn.onclick = closeModal;
    var cancelBtn = overlay.querySelector('.formatly-cancel');
    if (cancelBtn) cancelBtn.onclick = closeModal;
  }

  function addToolbarTooltips(toolbar) {
    toolbar.querySelectorAll('.formatly-toolbar-btn').forEach(btn => {
      let tip = btn.getAttribute('data-tip') || btn.getAttribute('title');
      if (!tip) return;
  
      btn.removeAttribute('title');
      btn.setAttribute('data-tip', tip);
  
      // Tooltip elementi oluştur
      let tooltip = document.createElement('span');
      tooltip.className = 'formatly-tooltip';
      tooltip.innerText = tip;
      toolbar.appendChild(tooltip);  // Butonun içine değil, toolbar içine ekliyoruz.
  
      btn.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
  
        const btnRect = btn.getBoundingClientRect();
        const toolbarRect = toolbar.getBoundingClientRect();
  
        // Tooltip genişlik ve yükseklik
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
  
        // Butona göre konum hesaplama (toolbar'a göre)
        const top = btnRect.top - toolbarRect.top - tooltipHeight - 8; // 8px boşluk üstünde
        let left = btnRect.left - toolbarRect.left + (btnRect.width / 2) - (tooltipWidth / 2);
  
        // Taşmayı engelle
        if (left < 0) left = 0;
        if (left + tooltipWidth > toolbar.offsetWidth) left = toolbar.offsetWidth - tooltipWidth;
  
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
      });
  
      btn.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
      });
    });
  }
  
  

  // Toolbar genişletme/scroll butonu
  function addToolbarExpand(toolbar, isInline) {
    if (toolbar.querySelector('.formatly-toolbar-expand')) return;
    const expandBtn = document.createElement('button');
    expandBtn.className = 'formatly-toolbar-expand';
    expandBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 22 22"><polyline points="6,9 11,14 16,9" stroke="#2563eb" stroke-width="2.5" fill="none"/></svg>';
    expandBtn.title = 'Tümünü Göster';
    expandBtn.onclick = function() {
      toolbar.classList.toggle('formatly-toolbar--expanded');
      if (toolbar.classList.contains('formatly-toolbar--expanded')) {
        expandBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 22 22"><polyline points="6,13 11,8 16,13" stroke="#2563eb" stroke-width="2.5" fill="none"/></svg>';
        expandBtn.title = 'Küçült';
        if(isInline) {
          toolbar.style.maxHeight = '400px';
          // Tüm overflowed sınıflarını kaldır
          toolbar.childNodes.forEach(el => { if (el.nodeType === 1) el.classList.remove('overflowed'); });
        }
      } else {
        expandBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 22 22"><polyline points="6,9 11,14 16,9" stroke="#2563eb" stroke-width="2.5" fill="none"/></svg>';
        expandBtn.title = 'Tümünü Göster';
        if(isInline) {
          toolbar.style.maxHeight = '56px';
          // Sığmayanları tekrar gizle (ilk 2 satır)
          let toolbarRect = toolbar.getBoundingClientRect();
          let tops = [];
          toolbar.childNodes.forEach(el => {
            if (el.nodeType !== 1) return;
            const rect = el.getBoundingClientRect();
            let relTop = Math.round(rect.top - toolbarRect.top);
            if (!tops.includes(relTop)) tops.push(relTop);
          });
          let allowedTops = tops.sort((a,b)=>a-b).slice(0,2);
          toolbar.childNodes.forEach(el => {
            if (el.nodeType !== 1) return;
            const rect = el.getBoundingClientRect();
            let relTop = Math.round(rect.top - toolbarRect.top);
            if (!allowedTops.includes(relTop)) {
              el.classList.add('overflowed');
            } else {
              el.classList.remove('overflowed');
            }
          });
        }
      }
    };
    toolbar.appendChild(expandBtn);
  }
})(); 


(function injectFormatlyStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
/* Formatly Modern Modal Editor Styles */
.formatly-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: background 0.2s;
}
.formatly-modal-overlay[style*="flex"] {
  display: flex !important;
}
.formatly-modal-card {
  background: #fff;
  padding: 32px 36px 24px 36px;
  border-radius: 14px;
  min-width: 320px;
  width: 420px;
  max-width: 98vw;
  box-shadow: 0 4px 32px rgba(0,0,0,0.18);
  position: relative;
  border: 1px solid #e0e0e0;
  transition: background 0.2s, box-shadow 0.2s;
}
@keyframes formatlyFadeIn {
  from { transform: scale(0.98) translateY(20px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
}
.formatly-resize-handle {
  position: absolute;
  right: 0; bottom: 0;
  width: 28px; height: 28px;
  cursor: nwse-resize;
  background: linear-gradient(135deg, #e0e7ff 60%, #fff 100%);
  border-bottom-right-radius: 12px;
  z-index: 20;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.formatly-resize-handle:after {
  content: '';
  display: block;
  width: 16px; height: 16px;
  border-right: 2.5px solid #2563eb;
  border-bottom: 2.5px solid #2563eb;
  border-radius: 0 0 6px 0;
  margin: 0 4px 4px 0;
}
.formatly-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
  background: #f3f6fd;
  border-radius: 7px;
  padding: 7px 10px;
}
.formatly-toolbar--collapsed {
  max-height: 104px;
  overflow-y: hidden;
  position: relative;
  top: 0;
}
.formatly-toolbar--expanded {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  min-height: 104px;
  box-shadow: 0 8px 32px rgba(40,48,60,0.10);
  z-index: 10;
}
.formatly-toolbar::-webkit-scrollbar { width: 8px; background: #f6f7fa; }
.formatly-toolbar--expanded::-webkit-scrollbar-thumb { background: #e0e7ff; border-radius: 6px; }
.formatly-toolbar-toggle {
  position: fixed;
  top: auto;
  right: 32px;
  margin-top: 6px;
  background: #e0e7ff;
  border: none;
  border-radius: 50%;
  width: 28px; height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1002;
  box-shadow: 0 1px 4px rgba(37,99,235,0.07);
  transition: background 0.18s;
}
.formatly-toolbar-toggle svg {
  width: 18px; height: 18px;
  display: block;
}
.formatly-toolbar-toggle:hover {
  background: #c7d2fe;
}
.formatly-toolbar-btn {
  background: none;
  border: none;
  font-size: 18px;
  border-radius: 5px;
  padding: 4px 10px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.formatly-toolbar-btn:hover {
  background: #e0e7ff;
  color: #2563eb;
}
.formatly-toolbar-btn:active {
  background: var(--formatly-blue-dark);
  color: #fff;
}
.formatly-toolbar-btn svg {
  display: block;
  width: 18px; height: 18px;
  pointer-events: none;
}


.formatly-editor {
  min-height: 120px;
  border: 1px solid #e0e0e0;
  border-radius: 7px;
  padding: 12px 14px;
  font-size: 17px;
  background: #fafbff;
  margin-bottom: 18px;
  transition: background 0.2s, border 0.2s;
}
.formatly-editor blockquote {
  border-left: 3px solid #2563eb;
  margin: 12px 0;
  padding: 8px 16px;
  color: #555;
  background: #f3f6fd;
  font-style: italic;
  border-radius: 6px;
}
.formatly-editor pre {
  background: #f4f4f4;
  color: #222;
  padding: 10px 14px;
  border-radius: 6px;
  font-family: 'Fira Mono', 'Consolas', monospace;
  font-size: 0.98em;
  overflow-x: auto;
}
.formatly-editor a {
  color: #2563eb;
  text-decoration: underline;
  word-break: break-all;
}
.formatly-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}
.formatly-save, .formatly-cancel {
  padding: 7px 18px;
  border-radius: 6px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.formatly-save {
  background: #2563eb;
  color: #fff;
}
.formatly-save:hover {
  background: #1746a2;
}
.formatly-cancel {
  background: #f3f6fd;
  color: #222;
}
.formatly-cancel:hover {
  background: #e0e7ff;
}
@media (max-width: 600px) {
  .formatly-modal-card {
    width: 100vw;
    min-height: 90vh;
    max-width: 100vw;
    border-radius: 0;
  }
  .formatly-modal-footer {
    padding: 12px 8px;
  }
  .formatly-editor {
    padding: 14px 8px;
    font-size: 1.01rem;
  }
  .formatly-toolbar {
    padding: 8px 4px;
    min-height: 40px;
    gap: 1px;
  }
  .formatly-toolbar-toggle {
    right: 12px;
  }
}
/* Dark mode için uygun sınıf (şart değil, örnek) */
html.dark .formatly-modal-card,
body.dark .formatly-modal-card,
[data-theme="dark"] .formatly-modal-card {
  background: #181c24;
  color: #f3f6fd;
  border-color: #23283a;
}
html.dark .formatly-modal-overlay,
body.dark .formatly-modal-overlay,
[data-theme="dark"] .formatly-modal-overlay {
  background: rgba(10,12,20,0.85);
}
html.dark .formatly-toolbar,
body.dark .formatly-toolbar,
[data-theme="dark"] .formatly-toolbar {
  background: #23283a;
}
html.dark .formatly-toolbar-btn,
body.dark .formatly-toolbar-btn,
[data-theme="dark"] .formatly-toolbar-btn {
  color: #f3f6fd;
}
html.dark .formatly-toolbar-btn:hover,
body.dark .formatly-toolbar-btn:hover,
[data-theme="dark"] .formatly-toolbar-btn:hover {
  background: #23283a;
  color: #7ba7ff;
}
html.dark .formatly-editor,
body.dark .formatly-editor,
[data-theme="dark"] .formatly-editor {
  background: #23283a;
  color: #f3f6fd;
  border-color: #23283a;
}
html.dark .formatly-save,
body.dark .formatly-save,
[data-theme="dark"] .formatly-save {
  background: #2563eb;
  color: #fff;
}
html.dark .formatly-cancel,
body.dark .formatly-cancel,
[data-theme="dark"] .formatly-cancel {
  background: #23283a;
  color: #f3f6fd;
}
html.dark .formatly-toolbar-inline,
body.dark .formatly-toolbar-inline,
[data-theme="dark"] .formatly-toolbar-inline {
  background: #23283a;
  color: #f3f6fd;
  border-color: #23283a;
}
html.dark .formatly-toolbar-inline button,
body.dark .formatly-toolbar-inline button,
[data-theme="dark"] .formatly-toolbar-inline button {
  color: #f3f6fd;
}
html.dark .formatly-toolbar-inline button:hover,
body.dark .formatly-toolbar-inline button:hover,
[data-theme="dark"] .formatly-toolbar-inline button:hover {
  background: #181c24;
  color: #7ba7ff;
}
html.dark .formatly-toolbar-inline .formatly-adv-btn,
body.dark .formatly-toolbar-inline .formatly-adv-btn,
[data-theme="dark"] .formatly-toolbar-inline .formatly-adv-btn {
  background: #2563eb;
  color: #fff;
}
html.dark .formatly-toolbar-inline .formatly-adv-btn:hover,
body.dark .formatly-toolbar-inline .formatly-adv-btn:hover,
[data-theme="dark"] .formatly-toolbar-inline .formatly-adv-btn:hover {
  background: #1746a2;
}
.formatly-open-btn {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 999;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 16px 24px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(37,99,235,0.15);
  transition: background 0.2s;
}
.formatly-open-btn:hover {
  background: #1d4ed8;
}
@media (max-width: 600px) {
  .formatly-open-btn {
    bottom: 16px;
    right: 16px;
    padding: 12px 16px;
    font-size: 0.95rem;
  }
}
.formatly-toolbar-select, .formatly-toolbar-input {
  background: #f6f7fa;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 5px 8px;
  margin: 0 4px;
  font-size: 1rem;
  color: #23272f;
  outline: none;
  transition: border 0.18s;
}
.formatly-toolbar-select:focus, .formatly-toolbar-input:focus {
  border: 1.5px solid #2563eb;
}
.formatly-toolbar-btn[data-cmd="clearAll"] {
  background: #fff0f0;
  color: #e53e3e;
  border: 1.5px solid #e53e3e;
}
.formatly-toolbar-btn[data-cmd="clearAll"]:hover {
  background: #e53e3e;
  color: #fff;
}
.formatly-toolbar-menu {
  position: absolute;
  top: 110%;
  left: 0;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(40,48,60,0.10);
  padding: 8px 12px;
  z-index: 20;
  min-width: 160px;
  white-space: nowrap;
  display: none;
}
.formatly-toolbar-menu.open {
  display: block;
}
.formatly-toolbar-menu-item {
  padding: 7px 10px;
  border-radius: 5px;
  cursor: pointer;
  color: #23408e;
  font-size: 1rem;
  transition: background 0.15s;
}
.formatly-toolbar-menu-item:hover {
  background: #e0e7ff;
}
.formatly-color-btn {
  position: relative;
}
.formatly-color-palette {
  display: none;
  position: absolute;
  top: 110%;
  left: 0;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(40,48,60,0.10);
  padding: 6px 8px;
  z-index: 10;
  min-width: 120px;
  white-space: nowrap;
}
.formatly-color-swatch {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin: 2px;
  border: 1.5px solid #e5e7eb;
  cursor: pointer;
  transition: border 0.15s, box-shadow 0.15s;
}
.formatly-color-swatch:hover {
  border: 1.5px solid #2563eb;
  box-shadow: 0 0 0 2px #e0e7ff;
}
.formatly-toolbar-inputwrap {
  display: inline-flex;
  align-items: center;
  background: #f6f7fa;
  border-radius: 6px;
  margin: 0 4px;
  padding: 0 2px;
}
.formatly-toolbar-input {
  width: 48px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 5px 6px;
  font-size: 1rem;
  color: #23272f;
  background: #fff;
  outline: none;
  margin-right: 2px;
  transition: border 0.18s;
}
.formatly-toolbar-input:focus {
  border: 1.5px solid #2563eb;
}
.formatly-toolbar-pxlabel {
  font-size: 0.98rem;
  color: #888;
  margin-right: 2px;
}
:root {
  --formatly-blue: #2563eb;
  --formatly-blue-dark: #1d4ed8;
  --formatly-blue-mat: #23408e;
  --formatly-bg: #f6f7fa;
  --formatly-toolbar-bg: #eaf0fa;
}
.formatly-help-modal {
  position: fixed;
  left: 0; top: 0; width: 100vw; height: 100vh;
  background: rgba(40,48,60,0.18);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.formatly-help-content {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(40,48,60,0.18), 0 1.5px 6px rgba(40,48,60,0.10);
  min-width: 260px;
  max-width: 420px;
  padding: 18px 16px 16px 16px;
  position: relative;
  animation: formatlyFadeIn 0.22s;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.formatly-help-close {
  position: absolute;
  right: 18px; top: 18px;
  background: var(--formatly-blue-mat);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 32px; height: 32px;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(37,99,235,0.07);
  transition: background 0.18s;
  z-index: 2;
}
.formatly-help-close:hover {
  background: var(--formatly-blue-dark);
}
.formatly-help-content h2 {
  margin-top: 0;
  color: var(--formatly-blue-mat);
  font-size: 1.1rem;
  margin-bottom: 10px;
  text-align: left;
}
.formatly-help-intro {
  font-size: 1.01rem;
  color: #23408e;
  background: #f6f7fa;
  border-radius: 7px;
  padding: 10px 12px;
  margin-bottom: 12px;
  line-height: 1.6;
}
.formatly-help-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
  max-height: 38vh;
  overflow-y: auto;
  margin-top: 4px;
}
.formatly-help-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.98rem;
  background: #f6f7fa;
  border-radius: 7px;
  padding: 5px 8px;
}
.formatly-help-icon {
  width: 20px; height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.formatly-help {
  background: var(--formatly-blue-mat);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 32px; height: 32px;
  font-size: 1.2rem;
  margin-right: 10px;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(37,99,235,0.07);
  transition: background 0.18s;
  display: flex;
  align-items: center;
  justify-content: center;
  order: -1;
}
.formatly-help:hover {
  background: var(--formatly-blue-dark);
}
.formatly-help-readme {
  margin-top: 10px;
  background: #f6f7fa;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.98rem;
  color: #23408e;
  line-height: 1.5;
}
.formatly-help-readme a {
  color: #2563eb;
  text-decoration: underline;
}
.formatly-modal-card.toolbar-expanded {
  padding-top: var(--formatly-toolbar-expanded-height, 220px);
}
.formatly-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 18px;
}
.formatly-logo {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  object-fit: cover;
  transition: box-shadow 0.2s;
}
.formatly-logo:hover {
  box-shadow: 0 4px 16px rgba(37,99,235,0.18);
}
.formatly-toolbar-inline {
  width: 500px;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  position: absolute;
  left: 0;
  bottom: calc(100% + 8px);
  z-index: 210;
  background: #fff;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 2px 12px rgba(0,0,0,0.13);
  padding: 6px 14px;
  gap: 8px;
  align-items: center;
  max-height: 56px;
  transition: max-height 0.35s cubic-bezier(.4,1.4,.6,1), box-shadow 0.18s, padding 0.18s;
}
.formatly-toolbar-inline .formatly-toolbar-btn,
.formatly-toolbar-inline select,
.formatly-toolbar-inline input,
.formatly-toolbar-inline .formatly-toolbar-inputwrap {
  flex: 0 0 auto;
}
.formatly-toolbar-inline .formatly-toolbar-btn,
.formatly-toolbar-inline select,
.formatly-toolbar-inline input,
.formatly-toolbar-inline .formatly-toolbar-inputwrap {
  /* Sığmayanları gizle */
  display: flex;
}
.formatly-toolbar-inline .formatly-toolbar-btn.overflowed,
.formatly-toolbar-inline select.overflowed,
.formatly-toolbar-inline input.overflowed,
.formatly-toolbar-inline .formatly-toolbar-inputwrap.overflowed {
  display: none !important;
}
.formatly-toolbar-inline.formatly-toolbar--expanded {
  flex-wrap: wrap;
  max-height: 400px;
  overflow: visible;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  z-index: 220;
  padding-bottom: 18px;
}
.formatly-toolbar-inline.formatly-toolbar--expanded .formatly-toolbar-btn,
.formatly-toolbar-inline.formatly-toolbar--expanded select,
.formatly-toolbar-inline.formatly-toolbar--expanded input,
.formatly-toolbar-inline.formatly-toolbar--expanded .formatly-toolbar-inputwrap {
  display: flex !important;
}
.formatly-toolbar-inline button {
  font-size: 17px;
  padding: 4px 10px;
  border: none;
  background: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.formatly-toolbar-inline button:hover {
  background: #f3f6fd;
  color: #2563eb;
}
.formatly-toolbar-inline .formatly-adv-btn {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  margin-left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  cursor: pointer;
}
.formatly-toolbar-inline .formatly-adv-btn:hover {
  background: #1746a2;
}
.formatly-toolbar-inline .formatly-adv-btn svg {
  display: block;
}
.formatly-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.formatly-modal-content {
  background: #fff;
  padding: 24px 32px;
  min-width: 320px;
  position: relative;
  box-shadow: 0 2px 16px rgba(0,0,0,0.12);
}
.formatly-close {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 24px;
  cursor: pointer;
}
.formatly-edit-area {
  width: 100%;
  min-height: 80px;
  margin-top: 12px;
  font-size: 16px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  resize: vertical;
  box-sizing: border-box;
}
/* Inline modal için */
.formatly-modal-inline {
  position: absolute;
  left: 0;
  right: 0;
  top: -120px; /* input'un üstünde gözüksün, gerekirse ayarlanabilir */
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  z-index: 100;
  pointer-events: auto;
}
.formatly-modal-content-inline {
  background: #fff;
  padding: 16px 20px 16px 20px;
  border-radius: 8px;
  min-width: 320px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.12);
  position: relative;
  border: 1px solid #e0e0e0;
}
.formatly-modal-content-inline h3 {
  margin-top: 0;
  font-size: 18px;
}
.formatly-modal-content-inline .formatly-close {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 22px;
  cursor: pointer;
}
.formatly-tooltip {
  position: absolute;
  background: #4978a3; /* Mat mavi - hafif gri alt tonlu */
  color: #f0f4f8; /* Çok açık mavi-beyaz arası */
  font-size: 13.5px;
  font-weight: 500;
  padding: 7px 16px;
  border-radius: 10px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(37, 78, 128, 0.3); /* Yumuşak gölge, mavimsi */
  border: 1px solid rgba(29, 59, 90, 0.5); /* Yarı saydam koyu mavi */
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s ease, visibility 0.25s ease, transform 0.25s ease;
  pointer-events: none;
  transform: translateY(6px); /* Hoverda hafif yukarı kaydırma efekti için */
}

.formatly-toolbar-btn:hover .formatly-tooltip,
.formatly-tooltip[style*="opacity: 1"] {
  opacity: 1;
  visibility: visible;
  transform: translateY(0); /* Hoverda orijinal pozisyona */
}


.formatly-toolbar-expand {
  position: absolute;
  right: 8px;
  bottom: 8px;
  background: #f3f6fd;
  border: 1.5px solid #2563eb;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 12;
  transition: background 0.18s, border 0.18s;
}
.formatly-toolbar-expand:hover {
  background: #2563eb;
  border-color: #1746a2;
}
.formatly-toolbar-expand svg {
  display: block;
}
.formatly-toolbar {
  position: relative;
  overflow-x: auto;
  max-height: 92px;
  transition: max-height 0.18s;
}
.formatly-toolbar--expanded {
  max-height: 400px !important;
  overflow-y: auto;
  background: #f3f6fd;
  box-shadow: 0 2px 12px rgba(0,0,0,0.13);
}
@media (max-width: 600px) {
  .formatly-toolbar {
    max-height: 120px;
  }
  .formatly-toolbar--expanded {
    max-height: 320px !important;
  }
} `;
  document.head.appendChild(style);
})();
