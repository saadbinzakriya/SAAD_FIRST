import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { INK, MUTED, RULE, PAGE_PADDING } from './constants.js';

const ACCENT = '#7A5C1E';

const s = StyleSheet.create({
  page: { padding: PAGE_PADDING, fontFamily: 'Helvetica', fontSize: 9.5, color: INK, lineHeight: 1.4 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, borderBottom: `2pt solid ${ACCENT}`, paddingBottom: 12 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 21, marginBottom: 4, lineHeight: 1.2 },
  role: { fontSize: 11, color: MUTED, lineHeight: 1.3 },
  photo: { width: 76, height: 96, objectFit: 'cover', border: `1pt solid ${RULE}` },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold', fontSize: 11, color: ACCENT, marginTop: 14, marginBottom: 6,
    textTransform: 'uppercase', letterSpacing: 0.8,
  },
  detailsBox: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#FAF7F0', padding: 10, marginBottom: 4 },
  detailItem: { width: '50%', marginBottom: 6 },
  detailLabel: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, color: MUTED, textTransform: 'uppercase', lineHeight: 1.3 },
  detailValue: { fontSize: 9.5, marginTop: 1, lineHeight: 1.3 },
  para: { fontSize: 9.5, marginBottom: 4, lineHeight: 1.4 },
  entryTitle: { fontFamily: 'Helvetica-Bold', fontSize: 10.5, lineHeight: 1.3 },
  entryMeta: { fontSize: 9, color: MUTED, marginBottom: 3, lineHeight: 1.3 },
  entryDesc: { fontSize: 9.5, marginBottom: 9, lineHeight: 1.4 },
  skillLine: { fontSize: 9.5, marginBottom: 4, lineHeight: 1.4 },
  skillCat: { fontFamily: 'Helvetica-Bold' },
  footer: { marginTop: 18, fontSize: 8.5, color: MUTED, fontStyle: 'italic', textAlign: 'center' },
});

export default function GulfCV({ data }) {
  const { profile = {}, skills = {}, experience = [], projects = [] } = data || {};

  const details = [
    ['Date of Birth', profile.dateOfBirth],
    ['Nationality', profile.nationality],
    ['Marital Status', profile.maritalStatus],
    ['Languages', profile.languages],
    ['Email', profile.email],
    ['Phone', profile.phone],
    ['Location', profile.location],
  ].filter(([, v]) => v);

  return (
    <Document title={`${profile.name || 'CV'} - CV`}>
      <Page size="A4" style={s.page}>
        <View style={s.headerRow}>
          <View>
            <Text style={s.name}>{profile.name || 'Your Name'}</Text>
            <Text style={s.role}>{profile.role || ''}</Text>
          </View>
          {profile.photo ? <Image src={profile.photo} style={s.photo} /> : null}
        </View>

        {details.length > 0 && (
          <>
            <Text style={s.sectionTitle} minPresenceAhead={40}>Personal Details</Text>
            <View style={s.detailsBox}>
              {details.map(([label, value]) => (
                <View key={label} style={s.detailItem}>
                  <Text style={s.detailLabel}>{label}</Text>
                  <Text style={s.detailValue}>{value}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {(profile.bio || profile.tagline) && (
          <>
            <Text style={s.sectionTitle} minPresenceAhead={40}>Career Objective</Text>
            <Text style={s.para}>{profile.bio || profile.tagline}</Text>
          </>
        )}

        {experience.length > 0 && (
          <>
            <Text style={s.sectionTitle} minPresenceAhead={40}>Work Experience</Text>
            {experience.map((e, i) => (
              <View key={i} wrap={false}>
                <Text style={s.entryTitle}>{e.title}{e.org ? ` — ${e.org}` : ''}</Text>
                <Text style={s.entryMeta}>{e.duration}</Text>
                <Text style={s.entryDesc}>{e.description}</Text>
              </View>
            ))}
          </>
        )}

        {profile.education && (
          <>
            <Text style={s.sectionTitle} minPresenceAhead={40}>Education</Text>
            <Text style={s.para}>{profile.education}</Text>
          </>
        )}

        {Object.keys(skills).length > 0 && (
          <>
            <Text style={s.sectionTitle} minPresenceAhead={40}>Skills</Text>
            {Object.entries(skills).map(([cat, list]) => (
              <Text key={cat} style={s.skillLine}><Text style={s.skillCat}>{cat}: </Text>{(list || []).join(', ')}</Text>
            ))}
          </>
        )}

        {projects.length > 0 && (
          <>
            <Text style={s.sectionTitle} minPresenceAhead={40}>Key Projects</Text>
            {projects.map((p, i) => (
              <View key={i} wrap={false} style={{ marginBottom: 8 }}>
                <Text style={s.entryTitle}>{p.title}{p.date ? ` (${p.date})` : ''}</Text>
                <Text style={s.entryDesc}>{p.description}</Text>
              </View>
            ))}
          </>
        )}

        <Text style={s.footer}>References available upon request</Text>
      </Page>
    </Document>
  );
}
