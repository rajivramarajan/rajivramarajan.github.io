// Polished Marriage Ritual App — storybook output (page 2)

// Sample agenda data — in a real app this would be AI-generated from inputs
function buildAgenda(data) {
  // For demo: a Hindu/Punjabi × Jewish/Ashkenazi script.
  // The shape here is what the AI would output.
  const isHinduJewish =
    [data.p1.religion, data.p2.religion].sort().join('|') === 'Hindu|Jewish';

  const findP = (religion) =>
    data.p1.religion === religion ? data.p1 : data.p2;
  const tagFor = (religion) =>
    data.p1.religion === religion ? 'p1' : 'p2';

  // Default agenda assumes Hindu × Jewish; for other combos we still show structure.
  const hindu = findP('Hindu') || data.p1;
  const jewish = findP('Jewish') || data.p2;

  return {
    couple: { p1: data.p1, p2: data.p2 },
    location: data.location || 'a place of your choosing',
    days: data.days || 3,
    dates: data.dates || '',
    prologue: {
      title: `Where ${data.p1.religion} & ${data.p2.religion} Meet`,
      lede: `Long before ${data.p1.name.split(' ')[0]} and ${data.p2.name.split(' ')[0]} found each other, their faiths had already been speaking the same language — just in different alphabets.`,
      body: isHinduJewish
        ? [
            `Both traditions canopy the couple in a four-pillared shelter — the **chuppah** in Hebrew, the **mandap** in Sanskrit — a small open home representing the bigger one to come.`,
            `Both honor the sacred number **seven**: *Sheva Brachot*, the seven blessings spoken under the chuppah, and *Saat Phere*, the seven steps walked around the fire.`,
            `Both close with a deliberate breaking — a glass beneath the foot, the ceremonial coconut — a reminder that joy is most precious when it remembers fragility.`,
          ]
        : [
            `Two ancient traditions, separated by geography, are about to share a single canopy.`,
            `This agenda finds the rhymes between ${data.p1.religion} and ${data.p2.religion} — moments where the symbolism naturally converges — and keeps the rituals that don't rhyme, intact and side by side.`,
            `Every section below can be edited, reordered, or set aside. Begin with the bones; let the wedding become yours.`,
          ],
    },
    chapters: [
      {
        roman: 'I',
        chapter: 'CHAPTER ONE',
        title: 'The Gathering',
        sub: `Pre-Wedding · Day 1 of ${data.days || 3}`,
        story: `Family arrives. Hands are painted, songs are sung, a Torah is read. We celebrate apart so we can celebrate together.`,
        items: [
          { tag: tagFor('Hindu'), label: 'Hindu', t: 'Mehndi', when: 'Morning', d: `${hindu.name?.split(' ')[0] || 'The bride'}'s hands and feet are adorned with henna; her women gather, sing, eat sweets.` },
          { tag: tagFor('Jewish'), label: 'Jewish', t: 'Aufruf', when: 'Afternoon', d: `${jewish.name?.split(' ')[0] || 'The groom'} is called up to the Torah; his community throws candy for a sweet life.` },
          { tag: 'both', label: 'Combined', t: 'Sangeet', when: 'Evening', d: 'Both families perform dances — a love letter to each other before the love letter to the couple.' },
        ],
      },
      {
        roman: 'II',
        chapter: 'CHAPTER TWO',
        title: 'The Joining',
        sub: `Wedding Day · Day 2 of ${data.days || 3}`,
        story: 'Under one canopy, two ancient ceremonies become one new one.',
        items: [
          { tag: tagFor('Hindu'), label: 'Hindu', t: 'Haldi', when: '09:30', d: 'Turmeric paste blesses skin and spirit.' },
          { tag: tagFor('Jewish'), label: 'Jewish', t: 'Bedeken (Veiling)', when: '11:00', d: `${jewish.name?.split(' ')[0] || 'The groom'} veils ${hindu.name?.split(' ')[0] || 'the bride'} — promising he sees her, all of her.` },
          { tag: tagFor('Hindu'), label: 'Hindu', t: 'Baraat Procession', when: '12:30', d: 'The groom arrives, carried by music and dancing.' },
          { tag: 'both', label: 'Combined', star: true, t: 'Chuppah · Mandap', when: '14:00', d: 'A four-pillar canopy honoring both traditions — for both names, for the home you are making.' },
          { tag: 'both', label: 'Combined', star: true, t: 'Saat Phere & Sheva Brachot', when: '15:00', d: 'Seven steps; seven blessings. The number repeats itself in two languages.' },
          { tag: tagFor('Jewish'), label: 'Jewish', t: 'Breaking the Glass', when: '15:30', d: 'Joy held inside the memory of fragility. "Mazel tov."' },
          { tag: 'both', label: 'Combined', t: 'Reception', when: '19:00', d: 'Hora chair lifts. Bhangra. Dinner. Cake.' },
        ],
      },
      {
        roman: 'III',
        chapter: 'CHAPTER THREE',
        title: 'The Sending Off',
        sub: `Post-Wedding · Day 3 of ${data.days || 3}`,
        story: 'Tradition asks us to mark the parting too — gently, with seven more blessings.',
        items: [
          { tag: tagFor('Hindu'), label: 'Hindu', t: 'Vidaai', when: 'Morning', d: `${hindu.name?.split(' ')[0] || 'The bride'}'s farewell from her childhood home.` },
          { tag: tagFor('Jewish'), label: 'Jewish', t: 'Sheva Brachot Dinner', when: 'Evening', d: 'The seven blessings, said again, all week long.' },
        ],
      },
    ],
  };
}

function PolishedOutput({ data, onBack }) {
  const agenda = React.useMemo(() => buildAgenda(data), [data]);
  const p1Name = data.p1.name.split(' ')[0];
  const p2Name = data.p2.name.split(' ')[0];

  // Renders **bold** and *italic* in body copy
  const fmt = (text) => {
    const parts = [];
    let i = 0;
    const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
    let m;
    let last = 0;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) parts.push(text.slice(last, m.index));
      const inner = m[0];
      if (inner.startsWith('**')) parts.push(<strong key={i++} style={{ fontWeight: 600, color: 'var(--ink)' }}>{inner.slice(2, -2)}</strong>);
      else parts.push(<em key={i++} style={{ color: 'var(--gold-deep)' }}>{inner.slice(1, -1)}</em>);
      last = m.index + inner.length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts;
  };

  const dotColor = (tag) =>
    tag === 'both' ? 'var(--gold)' :
    tag === 'p1' ? 'var(--henna)' : 'var(--sage)';

  return (
    <div style={{ position: 'relative' }}>
      {/* Action bar - hidden in print */}
      <div className="no-print" style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
        padding: '14px 32px', gap: 16,
        background: 'rgba(250,245,236,0.9)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--rule)',
      }}>
        <div style={{ justifySelf: 'start' }}>
          <button className="btn btn-ghost" onClick={onBack} style={{ whiteSpace: 'nowrap' }}>← Edit</button>
        </div>
        <div className="smallcaps" style={{ whiteSpace: 'nowrap' }}>Your Wedding Booklet</div>
        <div style={{ justifySelf: 'end', display: 'flex', gap: 8 }}>
          <button className="btn" style={{ whiteSpace: 'nowrap' }} onClick={() => navigator.share?.({ title: 'Our Wedding Agenda', url: location.href }) || alert('Share link copied (demo)')}>↗ Share</button>
          <button className="btn" style={{ whiteSpace: 'nowrap' }} onClick={() => window.print()}>⎙ Print</button>
        </div>
      </div>

      {/* ===== COVER ===== */}
      <section style={{
        minHeight: '95vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 32px',
        position: 'relative',
        background: 'linear-gradient(180deg, var(--paper) 0%, var(--paper-2) 100%)',
        textAlign: 'center',
      }}>
        <CoverFrame />
        <div className="smallcaps-lg" style={{ color: 'var(--gold-deep)' }}>
          ❦ &nbsp; THE WEDDING OF &nbsp; ❦
        </div>
        <h1 className="display" style={{
          fontSize: 'clamp(56px, 8vw, 120px)',
          margin: '32px 0 16px',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          maxWidth: '100%',
        }}>
          {p1Name} <span className="display-italic" style={{ color: 'var(--henna)' }}>&amp;</span> {p2Name}
        </h1>
        <Ornament style={{ maxWidth: 280, margin: '32px 0 24px' }} glyph="✦ ❦ ✦" />
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 22, color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>
          {agenda.dates && <>{agenda.dates} <span style={{ color: 'var(--ink-4)' }}>·</span> </>}
          {agenda.location}
        </div>
        <div className="smallcaps" style={{ marginTop: 18, whiteSpace: 'nowrap' }}>
          A {agenda.days}-day celebration · {data.p1.religion} & {data.p2.religion}
        </div>

        {/* Tradition seals */}
        <div style={{ display: 'flex', gap: 56, marginTop: 80, alignItems: 'flex-start' }}>
          <Seal name={data.p1.name} religion={data.p1.religion}
                community={data.p1.community} country={data.p1.country}
                color="var(--henna)" />
          <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--rule)' }} />
          <Seal name={data.p2.name} religion={data.p2.religion}
                community={data.p2.community} country={data.p2.country}
                color="var(--sage)" />
        </div>

        <div className="smallcaps" style={{ position: 'absolute', bottom: 32, color: 'var(--ink-4)' }}>
          Page 1
        </div>
      </section>

      {/* ===== PROLOGUE ===== */}
      <section style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: '120px 32px 80px',
      }}>
        <div className="center">
          <div className="smallcaps-lg" style={{ color: 'var(--gold-deep)' }}>
            ❦ &nbsp; A NOTE BEFORE WE BEGIN &nbsp; ❦
          </div>
          <h2 className="display" style={{ fontSize: 64, margin: '24px 0 8px' }}>
            <span className="display-italic">{agenda.prologue.title}</span>
          </h2>
          <Ornament style={{ maxWidth: 200, margin: '24px auto 40px' }} glyph="✦" />
        </div>

        <p className="dropcap" style={{
          fontSize: 22, lineHeight: 1.6, color: 'var(--ink-2)',
          marginBottom: 24, fontStyle: 'italic',
        }}>
          {agenda.prologue.lede}
        </p>

        {agenda.prologue.body.map((p, i) => (
          <p key={i} style={{ fontSize: 19, lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 18 }}>
            {fmt(p)}
          </p>
        ))}

        {/* Three pillars commonality */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          marginTop: 56,
          padding: '32px 0',
          borderTop: '1px solid var(--rule)',
          borderBottom: '1px solid var(--rule)',
        }}>
          {[
            { glyph: '⛨', label: 'Sacred Canopy', body: 'chuppah · mandap' },
            { glyph: 'VII', label: 'The Number Seven', body: 'sheva brachot · saat phere' },
            { glyph: '◈', label: 'Joyful Breaking', body: 'glass · coconut' },
          ].map((pillar, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 36, color: 'var(--gold-deep)',
                fontStyle: 'italic', lineHeight: 1, marginBottom: 8,
              }}>{pillar.glyph}</div>
              <div className="smallcaps" style={{ marginBottom: 4 }}>{pillar.label}</div>
              <div style={{ fontSize: 14, color: 'var(--ink-3)', fontStyle: 'italic' }}>{pillar.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CHAPTERS ===== */}
      {agenda.chapters.map((ch, ci) => (
        <Chapter key={ch.roman} ch={ch} ci={ci} fmt={fmt} dotColor={dotColor}
                 couple={agenda.couple} />
      ))}

      {/* ===== CLOSING ===== */}
      <section style={{
        textAlign: 'center',
        padding: '120px 32px 80px',
        background: 'linear-gradient(180deg, var(--paper) 0%, var(--paper-2) 100%)',
      }}>
        <Ornament style={{ maxWidth: 240, margin: '0 auto 28px' }} glyph="✦ ❦ ✦" />
        <h2 className="display" style={{ fontSize: 72, margin: '0 0 16px' }}>
          <span className="display-italic">The End — and the beginning.</span>
        </h2>
        <p style={{ fontSize: 22, color: 'var(--ink-2)', maxWidth: 520, margin: '0 auto', fontStyle: 'italic' }}>
          May {p1Name} and {p2Name} build a home as enduring as the canopy above them.
        </p>
        <div className="dot-rule no-print" style={{ maxWidth: 480, margin: '56px auto' }} />
        <div className="no-print" style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => window.print()}>⎙ Print Booklet</button>
          <button className="btn" onClick={() => navigator.share?.({ title: 'Our Wedding Agenda', url: location.href }) || alert('Share link copied (demo)')}>↗ Share with Family</button>
          <button className="btn btn-ghost" onClick={onBack}>✎ Edit Details</button>
        </div>
        <div className="smallcaps" style={{ marginTop: 56, color: 'var(--ink-4)' }}>
          Marriage Ritual App · Drafted with care · {agenda.chapters.length} Chapters · {agenda.days} Days
        </div>
      </section>
    </div>
  );
}

function CoverFrame() {
  return (
    <div style={{
      position: 'absolute', inset: 48,
      pointerEvents: 'none',
      border: '1px solid var(--rule)',
    }}>
      <div style={{ position: 'absolute', inset: 8, border: '1px solid var(--rule)', opacity: 0.4 }} />
      {/* Gold corner medallions */}
      {[
        { top: -10, left: -10 },
        { top: -10, right: -10 },
        { bottom: -10, left: -10 },
        { bottom: -10, right: -10 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', ...pos,
          width: 20, height: 20,
          background: 'var(--paper)',
          border: '1px solid var(--gold)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--gold-deep)', fontSize: 10,
        }}>✦</div>
      ))}
    </div>
  );
}

function Seal({ name, religion, community, country, color }) {
  return (
    <div style={{ textAlign: 'center', minWidth: 200 }}>
      <div style={{
        width: 78, height: 78, margin: '0 auto 16px',
        borderRadius: '50%',
        border: `1px solid ${color}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        background: 'var(--paper)',
      }}>
        <div style={{
          position: 'absolute', inset: 6, borderRadius: '50%',
          border: `1px solid ${color}`, opacity: 0.4,
        }} />
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic', fontSize: 36, color, lineHeight: 1,
        }}>{name[0]}</div>
      </div>
      <div className="display-italic" style={{ fontSize: 26, color: 'var(--ink)' }}>{name}</div>
      <div className="smallcaps" style={{ marginTop: 6, color }}>{religion}</div>
      <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 4, fontStyle: 'italic' }}>
        {community} · {country}
      </div>
    </div>
  );
}

function Chapter({ ch, ci, fmt, dotColor }) {
  // Alternate background between chapters for visual rhythm
  const altBg = ci % 2 === 1;
  return (
    <section style={{
      padding: '120px 32px 100px',
      background: altBg ? 'var(--paper-2)' : 'var(--paper)',
      borderTop: '1px solid var(--rule)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        {/* Chapter masthead */}
        <div className="center" style={{ marginBottom: 56 }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 96,
            color: 'var(--gold)',
            lineHeight: 1,
            opacity: 0.85,
          }}>{ch.roman}</div>
          <div className="smallcaps-lg" style={{ marginTop: -8, color: 'var(--gold-deep)' }}>
            {ch.chapter}
          </div>
          <h2 className="display" style={{ fontSize: 80, margin: '20px 0 4px' }}>
            <span className="display-italic">{ch.title}</span>
          </h2>
          <div className="smallcaps" style={{ marginTop: 8 }}>{ch.sub}</div>
          <Ornament style={{ maxWidth: 200, margin: '28px auto 0' }} glyph="✦" />
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 26,
            color: 'var(--ink-2)',
            maxWidth: 600,
            margin: '32px auto 0',
            lineHeight: 1.4,
          }}>
            {ch.story}
          </p>
        </div>

        {/* Items as a refined timeline */}
        <div style={{ position: 'relative', maxWidth: 780, margin: '0 auto' }}>
          {/* Center spine */}
          <div style={{
            position: 'absolute', left: 130, top: 12, bottom: 12,
            width: 1, background: 'var(--rule)',
          }} />

          {ch.items.map((it, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '120px 28px 1fr',
              gap: 0,
              alignItems: 'flex-start',
              padding: '18px 0',
              position: 'relative',
            }}>
              {/* Time */}
              <div style={{ paddingTop: 6, textAlign: 'right', paddingRight: 18 }}>
                <div className="smallcaps">{it.when}</div>
              </div>

              {/* Dot */}
              <div style={{ position: 'relative', paddingTop: 10 }}>
                <div style={{
                  width: it.star ? 14 : 10,
                  height: it.star ? 14 : 10,
                  borderRadius: '50%',
                  background: it.star ? 'var(--gold)' : 'var(--paper)',
                  border: `1.5px solid ${dotColor(it.tag)}`,
                  margin: '0 auto',
                  boxShadow: it.star ? '0 0 0 4px var(--gold-soft)' : 'none',
                }} />
              </div>

              {/* Card */}
              <div style={{
                padding: '14px 24px',
                background: it.star
                  ? 'linear-gradient(180deg, var(--gold-soft), var(--paper))'
                  : (altBg ? 'var(--paper)' : 'var(--paper-2)'),
                border: `1px solid ${it.star ? 'var(--gold)' : 'var(--rule)'}`,
                marginLeft: 12,
                position: 'relative',
              }}>
                {it.star && (
                  <div className="smallcaps" style={{
                    position: 'absolute', top: -10, left: 16,
                    background: 'var(--gold)', color: 'var(--paper)',
                    padding: '2px 10px', letterSpacing: '0.2em',
                  }}>✦ Combined</div>
                )}
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                  <h3 className="display" style={{ fontSize: 30, margin: 0, fontWeight: 400 }}>
                    {it.t}
                  </h3>
                  <span className="smallcaps" style={{
                    color: dotColor(it.tag),
                    whiteSpace: 'nowrap',
                  }}>{it.label}</span>
                </div>
                <p style={{ margin: '6px 0 0', fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.55 }}>
                  {fmt(it.d)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.PolishedOutput = PolishedOutput;
window.buildAgenda = buildAgenda;
