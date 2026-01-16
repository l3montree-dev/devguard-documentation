# Testing Your Documentation

## The "5-Minute Test"
- Can a user get to their first success in 5 minutes?
- Is there unnecessary information blocking that success?

## The "Copy-Paste Test"
- Can you literally copy-paste examples and have them work?
- Do examples require modification? (If yes, is that clearly stated?)

## The "Scan Test"
- Can a user scan headings and code blocks to understand the flow?
- Are key points visible without reading every word?

## The "Lost User Test"
- If a user lands on this page from Google, do they know:
  - What this is about?
  - If it's what they need?
  - Where to start?


# Documentation Smells (Red Flags)

- [ ] **Avoid these patterns:**
  - "Simply" or "just" (if it were simple, they wouldn't need docs)
  - Placeholder values in main examples (`YOUR_API_KEY`, `example.com`)
  - "For more information see..." without a link
  - Walls of text with no code examples
  - Schema-only without example data
  - "This is deprecated" without showing the new way
  - Instructions that assume previous steps worked

---

## Before Publishing Checklist

- [ ] **Reviewed by someone who doesn't know the feature** (fresh eyes)
- [ ] **Examples tested in a clean environment** (not just "works on my machine")
- [ ] **Links verified** (all internal and external links work)
- [ ] **Code syntax highlighted** (language tags on code blocks)
- [ ] **Screenshots are current** (match current UI if showing UI)
- [ ] **Terminology consistent** (same terms as other docs)

---

## Remember

**Good documentation is:**
- Accurate ✓
- Complete ✓
- Clear ✓

**Great documentation is:**
- Immediately useful ✓✓
- Progressively detailed ✓✓
- Tested in practice ✓✓

The difference between good and great is whether users can **actually accomplish their goals** with your documentation, not just whether the information is technically correct.
