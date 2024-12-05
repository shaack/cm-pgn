{
    function makeInteger(o) {
        return parseInt(o.join(""), 10);
    }
}

pgn
  = pw:pgnStartWhite all:pgnBlack?
      { var arr = (all ? all : []); arr.unshift(pw);return arr; }
  / pb:pgnStartBlack all:pgnWhite?
    { var arr = (all ? all : []); arr.unshift(pb); return arr; }
  / whiteSpace?
    { return [[]]; }

pgnStartWhite
  = pw:pgnWhite { return pw; }

pgnStartBlack
  = pb:pgnBlack { return pb; }

pgnWhite
  = whiteSpace? cm:comment? whiteSpace? mn:moveNumber? whiteSpace? cb:comment? whiteSpace?
    hm:halfMove  whiteSpace? nag:nags?  whiteSpace? ca:comment? whiteSpace? vari:variationWhite? all:pgnBlack?
    { var arr = (all ? all : []);
      var move = {}; move.turn = 'w'; move.moveNumber = mn;
      move.notation = hm; move.commentBefore = cb; move.commentAfter = ca; move.commentMove = cm;
      move.variations = (vari ? vari : []); move.nag = (nag ? nag : null); arr.unshift(move); return arr; }
  / endGame

pgnBlack
  = whiteSpace? cm:comment? whiteSpace? me:moveEllipse? whiteSpace? cb:comment? whiteSpace?
    hm:halfMove whiteSpace?  nag:nags? whiteSpace? ca:comment? whiteSpace? vari:variationBlack? all:pgnWhite?
    { var arr = (all ? all : []);
      var move = {}; move.turn = 'b'; move.moveNumber = me;
      move.notation = hm; move.commentBefore = cb; move.commentAfter = ca;
      move.variations = (vari ? vari : []); arr.unshift(move); move.nag = (nag ? nag : null); return arr; }
  / endGame

endGame
  = "1:0" { return ["1:0"]; }
  / "0:1" { return ["0:1"]; }
  / "1-0" { return ["1-0"]; }
  / "0-1" { return ["0-1"]; }
  / "1/2-1/2"  { return ["1/2-1/2"]; }
  / "*"  { return ["*"]; }

comment
  = cl cm:[^}]* cr { return cm.join("").trim(); }

cl = '{'

cr = '}'

variationWhite
  = pl vari:pgnWhite pr whiteSpace? all:variationWhite? whiteSpace? me:moveEllipse?
    { var arr = (all ? all : []); arr.unshift(vari); return arr; }

variationBlack
  = pl vari:pgnStartBlack pr whiteSpace? all:variationBlack?
    { var arr = (all ? all : []); arr.unshift(vari); return arr; }

pl = '('

pr = ')'

moveNumber
    = num:integer"."? { return num; }

integer "integer"
    = digits:[0-9]+ { return makeInteger(digits); }

whiteSpace
    = " "+ { return '';}

nullMove
  = "--" { var hm = {}; hm.notation = '--'; return hm; }

halfMove
  = nullMove
  / fig:figure? & checkdisc disc:discriminator str:strike?
    col:column row:row pr:promotion? ch:check?
    { var hm = {}; hm.fig = (fig ? fig : null); hm.disc =  (disc ? disc : null); hm.strike = (str ? str : null); hm.col = col; hm.row = row; hm.check = (ch ? ch : null); hm.promotion = pr; hm.notation = (fig ? fig : "") + (disc ? disc : "") + (str ? str : "") + col + row + (pr ? pr : "") + (ch ? ch : ""); return hm; }
  / fig:figure? cols:column rows:row str:strikeOrDash? col:column row:row pr:promotion? ch:check?
    { var hm = {}; hm.fig = (fig ? fig : null); hm.strike = (str =='x' ? str : null); hm.col = col; hm.row = row; hm.check = (ch ? ch : null); hm.notation = (fig && (fig!=='P') ? fig : "") + cols + rows + (str=='x' ? str : "-") + col  + row + (pr ? pr : "") + (ch ? ch : ""); hm.promotion = pr; return hm; }
  / fig:figure? str:strike? col:column row:row pr:promotion? ch:check?
    { var hm = {}; hm.fig = (fig ? fig : null); hm.strike = (str ? str : null); hm.col = col; hm.row = row; hm.check = (ch ? ch : null); hm.notation = (fig ? fig : "") + (str ? str : "") + col  + row + (pr ? pr : "") + (ch ? ch : ""); hm.promotion = pr; return hm; }
  / 'O-O-O' ch:check? { var hm = {}; hm.notation = 'O-O-O'+ (ch ? ch : ""); hm.check = (ch ? ch : null); return  hm; }
  / 'O-O' ch:check? { var hm = {}; hm.notation = 'O-O'+ (ch ? ch : ""); hm.check = (ch ? ch : null); return  hm; }

check
  = ch:(! '+-' '+') { return ch[1]; }
  / ch:(! '$$$' '#') { return ch[1]; }

promotion
  = '=' f:figure { return '=' + f; }

nags
  = nag:nag whiteSpace? nags:nags? { var arr = (nags ? nags : []); arr.unshift(nag); return arr; }

nag
  = '$' num:integer { return '$' + num; }
  / '!!' { return '$3'; }
  / '??' { return '$4'; }
  / '!?' { return '$5'; }
  / '?!' { return '$6'; }
  / '!' { return '$1'; }
  / '?' { return '$2'; }
  / '‼' { return '$3'; }
  / '⁇' { return '$4'; }
  / '⁉' { return '$5'; }
  / '⁈' { return '$6'; }
  / '□' { return '$7'; }
  / '=' { return '$10'; }
  / '∞' { return '$13'; }
  / '⩲' { return '$14'; }
  / '⩱' { return '$15';}
  / '±' { return '$16';}
  / '∓' { return '$17';}
  / '+-' { return '$18';}
  / '-+' { return '$19';}
  / '⨀' { return '$22'; }
  / '⟳' { return '$32'; }
  / '→' { return '$36'; }
  / '↑' { return '$40'; }
  / '⇆' { return '$132'; }
  / 'D' { return '$220'; }

discriminator
  = column
  / row


checkdisc
  = discriminator strike? column row

moveEllipse
  = num:integer"."+ { return num; }

figure
  = [RNBQKP]

column
  = [a-h]

row
  = [1-8]

strike
  = 'x'

strikeOrDash
  = 'x'
  / '-'
