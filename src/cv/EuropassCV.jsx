import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { INK, MUTED, NAVY, NAVY_LIGHT, PAGE_PADDING } from './constants.js';

const s = StyleSheet.create({
  page: { padding: PAGE_PADDING, fontFamily: 'Helvetica', fontSize: 9.5, color: INK, lineHeight: 1.4 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 20, color: NAVY, marginBottom: 4, lineHeight: 1.2 },
  role: { fontSize: 11, color: MUTED, lineHeight: 1.3 },
  photo: { width: 72, height: 90, objectFit: 'cover', border: `1pt solid ${NAVY}` },
  sectionBar: {
    backgroundColor: NAVY, color: '#FFFFFF', fontFamily: 'Helvetica-Bold', fontSize: 10,
    paddingVertical: 4, paddingHorizontal: 8, marginTop: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  row: { flexDirection: 'row', marginBottom: 6 },
  label: { width: 130, fontFamily: 'Helvetica-Bold', fontSize: 9, color: NAVY, lineHeight: 1.3 },
  value: { flex: 1, fontSize: 9.5, lineHeight: 1.3 },
  entryBlock: { flexDirection: 'row', marginBottom: 10 },
  entryDates: { width: 100, fontSize: 9, color: MUTED, lineHeight: 1.3 },
  entryBody: { flex: 1 },
  entryTitle: { fontFamily: 'Helvetica-Bold', fontSize: 10, lineHeight: 1.3 },
  entrySub: { fontSize: 9.5, color: MUTED, marginBottom: 2, lineHeight: 1.3 },
  entryDesc: { fontSize: 9.5, lineHeight: 1.4 },
  skillBox: { backgroundColor: NAVY_LIGHT, padding: 8, marginBottom: 6, borderRadius: 2 },
});

export default function EuropassCV({ data }) {
  const { profile = {}, skills = {}, experience = [], projects = [] } = data || {};

  return (
    <Document title={`${profile.name || 'CV'} - Europass CV`}>
      <Page size="A4" style={s.page}>
        <View style={s.headerRow}>
          <View>
            <Text style={s.name}>{profile.name || 'Your Name'}</Text>
            <Text style={s.role}>{profile.role || ''}</Text>
          </View>
          {profile.photo ? <Image src={profile.photo} style={s.photo} /> : null}
        </View>

        <Text style={s.sectionBar} minPresenceAhead={40}>Personal Information</Text>
        {profile.location ? <View style={s.row}><Text style={s.label}>Address</Text><Text style={s.value}>{profile.location}</Text></View> : null}
        {profile.phone ? <View style={s.row}><Text style={s.label}>Telephone</Text><Text style={s.value}>{profile.phone}</Text></View> : null}
        {profile.email ? <View style={s.row}><Text style={s.label}>Email</Text><Text style={s.value}>{profile.email}</Text></View> : null}
        {profile.nationality ? <View style={s.row}><Text style={s.label}>Nationality</Text><Text style={s.value}>{profile.nationality}</Text></View> : null}
        {profile.dateOfBirth ? <View style={s.row}><Text style={s.label}>Date of birth</Text><Text style={s.value}>{profile.dateOfBirth}</Text></View> : null}
        {(profile.linkedin || profile.github) ? <View style={s.row}><Text style={s.label}>Links</Text><Text style={s.value}>{[profile.linkedin, profile.github].filter(Boolean).join('   ')}</Text></View> : null}

        {(profile.bio || profile.tagline) && (
          <>
            <Text style={s.sectionBar} minPresenceAhead={40}>About Me</Text>
            <Text style={{ fontSize: 9.5, marginBottom: 4 }}>{profile.bio || profile.tagline}</Text>
          </>
        )}

        {experience.length > 0 && (
          <>
            <Text style={s.sectionBar} minPresenceAhead={40}>Work Experience</Text>
            {experience.map((e, i) => (
              <View key={i} style={s.entryBlock} wrap={false}>
                <Text style={s.entryDates}>{e.duration}</Text>
                <View style={s.entryBody}>
                  <Text style={s.entryTitle}>{e.title}</Text>
                  <Text style={s.entrySub}>{e.org}</Text>
                  <Text style={s.entryDesc}>{e.description}</Text>
                </View>
              </View>
            ))}
          </>
        )}

        {profile.education && (
          <>
            <Text style={s.sectionBar} minPresenceAhead={40}>Education and Training</Text>
            <Text style={{ fontSize: 9.5, marginBottom: 4 }}>{profile.education}</Text>
          </>
        )}

        <Text style={s.sectionBar} minPresenceAhead={40}>Personal Skills</Text>
        {profile.languages ? (
          <View style={s.row}><Text style={s.label}>Languages</Text><Text style={s.value}>{profile.languages}</Text></View>
        ) : null}
        {Object.entries(skills).map(([cat, list]) => (
          <View key={cat} style={s.skillBox}>
            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 9, color: NAVY, marginBottom: 2 }}>{cat}</Text>
            <Text style={{ fontSize: 9.5 }}>{(list || []).join(', ')}</Text>
          </View>
        ))}

        {projects.length > 0 && (
          <>
            <Text style={s.sectionBar} minPresenceAhead={40}>Projects</Text>
            {projects.map((p, i) => (
              <View key={i} style={{ marginBottom: 8 }} wrap={false}>
                <Text style={s.entryTitle}>{p.title}{p.date ? ` (${p.date})` : ''}</Text>
                <Text style={s.entryDesc}>{p.description}</Text>
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  );
}
