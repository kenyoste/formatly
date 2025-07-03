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
    <svg width="32px" height="32px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 0L16 3L9 10H6V7L13 0Z" fill="#000000"/>
<path d="M1 1V15H15V9H13V13H3V3H7V1H1Z" fill="#000000"/>
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
