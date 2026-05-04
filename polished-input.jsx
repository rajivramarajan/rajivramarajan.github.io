// Polished Marriage Ritual App — input form (page 1)
function PolishedInput({ data, setData, onGenerate }) {
  const update = (path) => (e) => {
    const value = e?.target ? e.target.value : e;
    setData((prev) => {
      const next = { ...prev };
      const keys = path.split('.');
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const RELIGIONS = ['Hindu', 'Jewish', 'Christian', 'Muslim', 'Sikh', 'Buddhist', 'Jain', 'Zoroastrian', 'Bahai', 'Humanism', 'Atheism'];

  const PersonCard = ({ which, person, color }) =>
  <div style={{
    position: 'relative',
    background: 'var(--paper)',
    padding: '48px 44px 40px',
    boxShadow: 'var(--shadow-card)',
    borderRadius: 2
  }}>
      {/* Decorative corner ornaments */}
      <Corners />
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div className="smallcaps" style={{ color }}>Partner {which === 'p1' ? 'I' : 'II'}</div>
        <div className="display-italic" style={{ fontSize: 38, marginTop: 4, color: 'var(--ink)' }}>
          {person.name || 'Their Name'}
        </div>
        <div style={{ width: 32, height: 1, background: color, margin: '14px auto 0' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div className="field">
          <label className="field-label">Full Name</label>
          <input className="field-input" placeholder="e.g. Aanya Kapoor"
        value={person.name} onChange={update(`${which}.name`)} />
        </div>

        <div className="field">
          <label className="field-label">Religion</label>
          <div className="chip-group" style={{ marginTop: 4 }}>
            {RELIGIONS.map((r) =>
          <button key={r} type="button"
          className={`chip ${person.religion === r ? 'active' : ''}`}
          onClick={() => update(`${which}.religion`)(r)}>{r}</button>
          )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="field">
            <label className="field-label">Community</label>
            <input className="field-input" placeholder="e.g. Punjabi"
          value={person.community} onChange={update(`${which}.community`)} />
          </div>
          <div className="field">
            <label className="field-label">Country</label>
            <input className="field-input" placeholder="e.g. India"
          value={person.country} onChange={update(`${which}.country`)} />
          </div>
        </div>
      </div>
    </div>;


  const valid = data.p1.name && data.p1.religion && data.p1.community && data.p1.country &&
  data.p2.name && data.p2.religion && data.p2.community && data.p2.country;

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 32px 80px' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '40px 0 24px' }}>
        <div className="smallcaps-lg" style={{ color: 'var(--gold-deep)' }}>
          ❦ &nbsp; A WEDDING AGENDA, WOVEN FROM TWO TRADITIONS &nbsp; ❦
        </div>
        <h1 className="display" style={{ fontSize: 86, margin: '20px 0 8px', fontWeight: 300 }}>
          Two Hearts, <span className="display-italic" style={{ color: 'var(--henna)' }}>One World</span>
        </h1>
        <p style={{ fontSize: 21, color: 'var(--ink-2)', maxWidth: 620, margin: '0 auto', fontStyle: 'italic' }}>
          Tell us about the couple. We'll thoughtfully weave a ceremony agenda
          that honors both lineages — every ritual editable by you.
        </p>
        <Ornament style={{ maxWidth: 200, margin: '32px auto 0' }} glyph="✦" />
      </div>

      {/* Two cards with ampersand divider */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 88px 1fr',
        gap: 0,
        alignItems: 'stretch',
        marginTop: 16
      }}>
        <PersonCard which="p1" person={data.p1} color="var(--henna)" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="display-italic" style={{
            fontSize: 86,
            color: 'var(--gold-deep)',
            fontWeight: 300,
            lineHeight: 1
          }}>&amp;</div>
        </div>
        <PersonCard which="p2" person={data.p2} color="var(--sage)" />
      </div>

      {/* Optional details */}
      <div style={{ marginTop: 56 }}>
        <Ornament style={{ maxWidth: 320, margin: '0 auto 8px' }} glyph="The Details" plain />
        <div className="center" style={{ marginBottom: 28, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 18, color: 'var(--ink-3)' }}>
          (Optional &mdash; Add what you can)
        </div>
        <div style={{
          background: 'var(--paper)',
          padding: '36px 44px',
          boxShadow: 'var(--shadow-soft)',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1.5fr',
          gap: 32
        }}>
          <div className="field">
            <label className="field-label">Wedding Location</label>
            <input className="field-input" placeholder="City, country"
            value={data.location} onChange={update('location')} />
          </div>
          <div className="field">
            <label className="field-label">Days</label>
            <input className="field-input" type="number" min="1" max="14" placeholder="3"
            value={data.days} onChange={update('days')} />
          </div>
          <div className="field">
            <label className="field-label">Dates</label>
            <input className="field-input" placeholder="e.g. Nov 14–16, 2026"
            value={data.dates} onChange={update('dates')} />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: 56 }}>
        <button className="btn btn-gold" disabled={!valid}
        onClick={onGenerate}
        style={{
          fontSize: 12, padding: '18px 44px',
          opacity: valid ? 1 : 0.4,
          cursor: valid ? 'pointer' : 'not-allowed'
        }}>
          Weave Our Agenda &nbsp;✦
        </button>
        <div className="smallcaps" style={{ marginTop: 14 }}>
          {valid ? 'AI drafts · You refine every detail' : 'Fill in both partners\' details to continue'}
        </div>
      </div>

      {/* Tiny privacy footer */}
      <div className="center" style={{ marginTop: 56, fontSize: 13, color: 'var(--ink-3)', fontStyle: 'italic' }}>
        Your story stays private — nothing is saved unless you choose to share.
      </div>
    </div>);

}

function Corners() {
  const c = {
    position: 'absolute',
    width: 22, height: 22,
    borderColor: 'var(--rule)',
    borderStyle: 'solid',
    borderWidth: 0
  };
  return (
    <>
      <div style={{ ...c, top: 14, left: 14, borderTopWidth: 1, borderLeftWidth: 1 }} />
      <div style={{ ...c, top: 14, right: 14, borderTopWidth: 1, borderRightWidth: 1 }} />
      <div style={{ ...c, bottom: 14, left: 14, borderBottomWidth: 1, borderLeftWidth: 1 }} />
      <div style={{ ...c, bottom: 14, right: 14, borderBottomWidth: 1, borderRightWidth: 1 }} />
    </>);

}

function Ornament({ style, glyph = '✦', plain = false }) {
  return (
    <div className="ornament" style={style}>
      {plain ?
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'var(--ink-2)', textAlign: "center", opacity: "1", fontSize: "22px" }}>{glyph}</span> :

      <span className="ornament-glyph">{glyph}</span>
      }
    </div>);

}

window.PolishedInput = PolishedInput;
window.Ornament = Ornament;
window.Corners = Corners;