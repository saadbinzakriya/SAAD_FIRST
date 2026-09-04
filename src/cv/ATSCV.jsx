import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { INK, MUTED, RULE, PAGE_PADDING } from './constants.js';

const s = StyleSheet.create({
  page: { padding: PAGE_PADDING, fontFamily: 'Helvetica', fontSize: 10, color: INK, lineHeight: 1.45 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 20, marginBottom: 4, lineHeight: 1.2 },
  role: { fontSize: 11, color: MUTED, marginBottom: 6, lineHeight: 1.3 },
  contactLine: { fontSize: 9.5, color: MUTED, marginBottom: 14, lineHeight: 1.4 },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold', fontSize: 11, marginTop: 14, marginBottom: 6,
    paddingBottom: 3, borderBottom: `1pt solid ${RULE}`, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  para: { fontSize: 10, marginBottom: 6, lineHeight: 1.4 },
  entryTitle: { fontFamily: 'Helvetica-Bold', fontSize: 10.5, lineHeight: 1.3 },
  entryMeta: { fontSize: 9.5, color: MUTED, marginBottom: 3, lineHeight: 1.3 },
  entryDesc: { fontSize: 10, marginBottom: 9, lineHeight: 1.4 },
  skillLine: { fontSize: 10, marginBottom: 4, lineHeight: 1.4 },
  skillCat: { fontFamily: 'Helvetica-Bold' },
});

export default function ATSCV({ data }) {
  const { profile = {}, skills = {}, experience = [], projects = [] } = data || {};
  const contact = [profile.email, profile.phone, profile.location, profile.linkedin, profile.github].filter(Boolean).join('   |   ');

  return (
    <Document title={`${profile.name || 'Resume'} - Resume`}>
      <Page size="A4" style={s.page}>
        <Text style={s.name}>{profile.name || 'Your Name'}</Text>
        <Text style={s.role}>{profile.role || ''}</Text>
        <Text style={s.contactLine}>{contact}</Text>

        {(profile.bio || profile.tagline) && (
          <View>
            <Text style={s.sectionTitle} minPresenceAhead={40}>Professional Summary</Text>
            <Text style={s.para}>{profile.bio || profile.tagline}</Text>
          </View>
        )}

        {experience.length > 0 && (
          <View>
            <Text style={s.sectionTitle} minPresenceAhead={40}>Experience</Text>
            {experience.map((e, i) => (
              <View key={i} wrap={false}>
                <Text style={s.entryTitle}>{e.title}{e.org ? ` — ${e.org}` : ''}</Text>
                <Text style={s.entryMeta}>{e.duration}</Text>
                <Text style={s.entryDesc}>{e.description}</Text>
              </View>
            ))}
          </View>
        )}

        {profile.education && (
          <View>
            <Text style={s.sectionTitle} minPresenceAhead={40}>Education</Text>
            <Text style={s.para}>{profile.education}</Text>
          </View>
        )}

        {Object.keys(skills).length > 0 && (
          <View>
            <Text style={s.sectionTitle} minPresenceAhead={40}>Skills</Text>
            {Object.entries(skills).map(([cat, list]) => (
              <Text key={cat} style={s.skillLine}><Text style={s.skillCat}>{cat}: </Text>{(list || []).join(', ')}</Text>
            ))}
          </View>
        )}

        {profile.languages && (
          <View>
            <Text style={s.sectionTitle} minPresenceAhead={40}>Languages</Text>
            <Text style={s.para}>{profile.languages}</Text>
          </View>
        )}

        {projects.length > 0 && (
          <View>
            <Text style={s.sectionTitle} minPresenceAhead={40}>Projects</Text>
            {projects.map((p, i) => (
              <View key={i} wrap={false} style={{ marginBottom: 8 }}>
                <Text style={s.entryTitle}>{p.title}{p.date ? ` (${p.date})` : ''}</Text>
                {p.tags && p.tags.length > 0 && <Text style={s.entryMeta}>{p.tags.join(', ')}</Text>}
                <Text style={s.para}>{p.description}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
