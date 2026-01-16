# DevGuard Documentation Templates

This directory contains templates for creating consistent, high-quality documentation following the Diataxis framework.

## Available Templates

### 1. Tutorial Template (`tutorial-template.mdx`)
**Use for:** Step-by-step learning experiences for new users

**Characteristics:**
- Learning-oriented
- Takes users through a complete workflow
- Provides clear learning outcomes
- Includes verification steps
- Estimated time: 15-30 minutes typically

**Example topics:**
- Your First Security Scan
- Setting Up CI/CD Integration
- Creating Your First Compliance Report

---

### 2. How-to Guide Template (`how-to-template.mdx`)
**Use for:** Task-focused guides solving specific problems

**Characteristics:**
- Problem-oriented
- Assumes some familiarity
- Gets straight to the solution
- Multiple approaches where applicable
- Estimated time: 5-15 minutes typically

**Example topics:**
- How to Configure Risk Thresholds
- How to Mark a Vulnerability as False Positive
- How to Set Up Image Signing

---

### 3. API Endpoint Template (`api-endpoint-template.mdx`)
**Use for:** REST API endpoint documentation

**Characteristics:**
- Information-oriented
- Comprehensive reference
- Multiple code examples
- Complete request/response schemas
- Error documentation

**Example topics:**
- GET /api/v1/projects
- POST /api/v1/scans
- PUT /api/v1/vulnerabilities/{id}

---

### 4. CLI Command Template (`cli-command-template.mdx`)
**Use for:** Command-line tool reference documentation

**Characteristics:**
- Information-oriented
- Complete flag reference
- Multiple usage examples
- Exit code documentation
- Configuration options

**Example topics:**
- devguard-scanner sca
- devguard-cli vulndb sync
- devguard-scanner container

---

### 5. Concept Explanation Template (`concept-explanation-template.mdx`)
**Use for:** Deep understanding of concepts and architecture

**Characteristics:**
- Understanding-oriented
- Explains why and how
- Includes diagrams
- Discusses trade-offs
- No step-by-step instructions

**Example topics:**
- Understanding Risk Scoring
- Supply Chain Security Architecture
- In-toto Attestations Explained

---

### 6. Troubleshooting Template (`troubleshooting-template.mdx`)
**Use for:** Diagnosing and fixing specific problems

**Characteristics:**
- Problem-solving oriented
- Systematic diagnostic process
- Common causes and solutions
- Quick checks section
- Prevention tips

**Example topics:**
- Troubleshooting: Authentication Failures
- Troubleshooting: Scanner Not Detecting Dependencies
- Troubleshooting: GitLab Component Not Found

---

## How to Use These Templates

### Step 1: Choose the Right Template

Ask yourself:
- **Tutorial:** Am I teaching someone new to accomplish a complete task from start to finish?
- **How-to:** Am I helping someone solve a specific problem who already has some context?
- **API/CLI Reference:** Am I documenting a specific endpoint or command?
- **Concept:** Am I explaining how something works and why it was designed that way?
- **Troubleshooting:** Am I helping someone fix a specific problem or error?

### Step 2: Copy the Template

```bash
cp templates/[template-name].mdx src/pages/[section]/[your-page-name].mdx
```

### Step 3: Fill in the Template

1. **Replace all [placeholders]** with actual content
2. **Update metadata** (title, description, difficulty, reading time)
3. **Add real code examples** - no "example" placeholders
4. **Include diagrams** where helpful (use Mermaid)
5. **Test all commands** to ensure they work
6. **Add real links** to related pages

### Step 4: Follow Content Guidelines

#### ✅ Do:
- Use clear, concise language
- Include working code examples
- Add visual aids (diagrams, screenshots)
- Link to related documentation
- Update the "last updated" date
- Test all commands before publishing
- Use callouts for important information
- Include prerequisites
- Add difficulty level

#### ❌ Don't:
- Leave placeholder text
- Use "foo/bar/baz" in examples
- Skip prerequisites section
- Forget to update metadata
- Include broken links
- Copy-paste without customization
- Mix template types (keep them focused)

### Step 5: Review Checklist

Before publishing, ensure:

- [ ] All [placeholders] replaced
- [ ] Title and description are clear
- [ ] Difficulty level is accurate
- [ ] Reading time is estimated
- [ ] Prerequisites are listed
- [ ] Code examples are tested
- [ ] Links are working
- [ ] Diagrams render correctly
- [ ] Callouts are used appropriately
- [ ] Related pages are linked
- [ ] "Last updated" date is current
- [ ] Follows Diataxis principles
- [ ] Grammar and spelling checked

---

## Template Customization

Feel free to customize these templates for specific needs:

### Adding Sections
If a template doesn't have a section you need:
1. Add it in a logical place
2. Update the template for future use
3. Keep consistency across similar pages

### Removing Sections
If a section doesn't apply:
1. Delete it (don't leave empty sections)
2. Make sure the flow still makes sense
3. Keep required sections (metadata, title, etc.)

### Special Cases

#### Multi-platform Documentation
Use tabs for different platforms:
```mdx
<Tabs items={['Linux', 'macOS', 'Windows']}>
  <Tabs.Tab>Linux content</Tabs.Tab>
  <Tabs.Tab>macOS content</Tabs.Tab>
  <Tabs.Tab>Windows content</Tabs.Tab>
</Tabs>
```

#### Version-specific Documentation
Add version badges or callouts:
```mdx
<Callout type="info">
  **Version:** This feature is available in v1.5.0+
</Callout>
```

#### Deprecated Features
Mark deprecated content clearly:
```mdx
<Callout type="warning">
  **Deprecated:** This feature is deprecated as of v2.0.0. Use [new feature] instead.
</Callout>
```

---

## Best Practices

### Writing Style
- **Active voice:** "Run the command" not "The command should be run"
- **Present tense:** "The scanner detects" not "The scanner will detect"
- **Direct:** Address the reader as "you"
- **Concise:** Get to the point quickly

### Code Examples
- Always include comments
- Show expected output
- Use realistic data (not "foo" and "bar")
- Highlight important lines when helpful

### Diagrams
- Use Mermaid for architecture and flow diagrams
- Keep diagrams simple and focused
- Add captions explaining what's shown
- Use consistent colors/shapes

### Links
- Use descriptive link text (not "click here")
- Link to related documentation
- Keep links current
- Use relative links for internal pages

---

## Getting Help

If you're unsure which template to use or how to structure content:

1. Check existing documentation for similar topics
2. Review the [Diataxis framework](https://diataxis.fr/)
3. Ask in the #documentation channel
4. Refer to the COMPREHENSIVE-STRUCTURE.md for overall organization

---

## Contributing Templates

To improve these templates:

1. Use a template for real documentation
2. Note any missing sections or confusion
3. Propose improvements
4. Update the template
5. Document the change

Keep templates:
- Generic enough to be reusable
- Specific enough to be helpful
- Updated with best practices
- Consistent with each other
