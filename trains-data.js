/* =====================================================================
   TRAIN TIMETABLE — edit this file only. Shown on trains.html.
   Source: "Pandharpur Mela 2027 – Onward / Return Trains" (prepared 22 Oct 2026).

   Any text can be a plain string (same in both languages) or t(english, tamil).
   In plain strings, "Feb" / "Dec" are shown as "பிப்." / "டிச." in Tamil.

   Train fields:
     no, name        – train number(s) and name
     from, to        – stations
     dep, arr        – departure / arrival, e.g. "02 Feb 06:35"
     legs            – optional list of steps for connecting journeys
     via             – Tamil Nadu stops
     change          – change of train / waiting time
     warn            – true to highlight `change` in red (tight / long wait)
     pickup          – true if the Trust arranges the Solapur bus (pick-up onward, drop on return)
     pickupNote      – optional extra pick-up / drop detail
     booking         – when booking opens
     starts          – where / when the train starts its run
     best            – true to mark as recommended
   ===================================================================== */
(function () {
  const t = (en, ta) => ({ en, ta });

  // Stations
  const SOLAPUR = t("Solapur", "சோலாப்பூர்");
  const PANDHARPUR_DIRECT = t("Pandharpur (direct)", "பண்டரிபுரம் (நேரடி)");
  const EGMORE = t("Chennai Egmore", "சென்னை எழும்பூர்");
  const CENTRAL = t("Chennai Central", "சென்னை சென்ட்ரல்");
  const KSR = t("KSR Bengaluru", "KSR பெங்களூரு");
  const CBE = t("Coimbatore", "கோயம்புத்தூர்");
  const MADURAI = t("Madurai", "மதுரை");

  // Common phrases
  const DIRECT = t("Direct – no change", "நேரடி ரயில் – மாற்றம் இல்லை");
  const ARAKKONAM = t("Arakkonam", "அரக்கோணம்");
  const DROP_630 = t("Drop at Solapur by 6:30 PM (together for 22159 and 12163).", "22159, 12163 இரண்டு ரயில்களுக்கும் சேர்த்து மாலை 6:30 மணிக்குள் சோலாப்பூரில் இறக்கி விடுவோம்.");
  const DROP_1AM = t("Drop at Solapur by 1:00 AM (together for 22157 and the Coimbatore-route trains).", "22157 மற்றும் கோயம்புத்தூர் வழித்தட ரயில்களுக்குச் சேர்த்து அதிகாலை 1:00 மணிக்குள் சோலாப்பூரில் இறக்கி விடுவோம்.");

  window.MELA_TRAINS = {
    /* ------------------------------------------------------------ ONWARD */
    onward: {
      window: t(
        "Reach Solapur / Pandharpur between the night of <b>2 Feb 2027 (Tuesday)</b> and <b>noon on 3 Feb 2027 (Wednesday)</b>. The programme starts on the evening of 3 Feb; accommodation is arranged from the morning of 3 Feb.",
        "<b>2 பிப்ரவரி 2027 (செவ்வாய்)</b> இரவு முதல் <b>3 பிப்ரவரி 2027 (புதன்) மதியம் 12 மணிக்குள்</b> சோலாப்பூர் / பண்டரிபுரம் சேர வேண்டும். நிகழ்ச்சி 3 பிப்ரவரி மாலை தொடங்குகிறது; தங்குமிடம் 3 பிப்ரவரி காலை முதல் ஏற்பாடு செய்யப்பட்டுள்ளது."
      ),
      notes: [
        t("Booking for most onward trains opens on <b>Friday 4 Dec 2026 at 8:00 AM</b> on IRCTC. For trains leaving Madurai on 1 Feb, booking opens on <b>Thursday 3 Dec 2026</b>.",
          "பெரும்பாலான போகும் ரயில்களுக்கு முன்பதிவு <b>வெள்ளி 4 டிசம்பர் 2026 காலை 8:00 மணிக்கு</b> தொடங்கும். மதுரையிலிருந்து 1 பிப். புறப்படும் ரயில்களுக்கு <b>வியாழன் 3 டிசம்பர் 2026</b> அன்று தொடங்கும்."),
        t("Timings are from the current railway timetable (Oct 2026). Please re-check each train on IRCTC when you book.",
          "நேரங்கள் தற்போதைய ரயில் அட்டவணைப்படி (அக்டோபர் 2026) உள்ளன. முன்பதிவு செய்யும்போது IRCTC-யில் மீண்டும் சரிபார்க்கவும்."),
        t("If possible, come by a train that has a pick-up, or via Bengaluru on the 16535 Golgumbaz Express.",
          "முடிந்தவரை பிக்-அப் உள்ள ரயிலில் அல்லது பெங்களூர் மார்க்கமாக 16535 கோல்கும்பாஸ் எக்ஸ்பிரஸில் பண்டரிபுரம் வரவும்."),
      ],
      routes: [
        {
          city: t("Chennai", "சென்னை"),
          intro: t("All three trains run daily.", "மூன்று ரயில்களும் தினமும் இயங்கும்."),
          trains: [
            { no: "22158", name: t("MS–CSMT SF Express", "MS–CSMT SF எக்ஸ்பிரஸ்"), from: EGMORE, to: SOLAPUR, dep: "02 Feb 06:35", arr: "02 Feb 21:45", via: ARAKKONAM, change: DIRECT, pickup: true, booking: "04 Dec 2026", starts: t("Chennai Egmore, 02 Feb 06:35", "சென்னை எழும்பூர், 02 பிப். 06:35") },
            { no: "22160", name: t("MAS–CSMT SF Express", "MAS–CSMT SF எக்ஸ்பிரஸ்"), from: CENTRAL, to: SOLAPUR, dep: "02 Feb 13:15", arr: "03 Feb 04:00", via: ARAKKONAM, change: DIRECT, pickup: true, booking: "04 Dec 2026", starts: t("Chennai Central, 02 Feb 13:15", "சென்னை சென்ட்ரல், 02 பிப். 13:15") },
            { no: "12164", name: t("MAS–LTT SF Express", "MAS–LTT SF எக்ஸ்பிரஸ்"), from: CENTRAL, to: SOLAPUR, dep: "02 Feb 18:25", arr: "03 Feb 07:40", via: ARAKKONAM, change: DIRECT, pickup: false, booking: "04 Dec 2026", starts: t("Chennai Central, 02 Feb 18:25", "சென்னை சென்ட்ரல், 02 பிப். 18:25") },
          ],
        },
        {
          city: t("Bengaluru", "பெங்களூரு"),
          trains: [
            { no: "16535", name: t("Golgumbaz Express", "கோல்கும்பாஸ் எக்ஸ்பிரஸ்"), best: true, from: t("KSR Bengaluru (Yesvantpur 18:40)", "KSR பெங்களூரு (யஷ்வந்த்பூர் 18:40)"), to: PANDHARPUR_DIRECT, dep: "02 Feb 18:20", arr: t("03 Feb 12:25 (Solapur 10:10)", "03 பிப். 12:25 (சோலாப்பூர் 10:10)"), change: t("Direct – no change. Reaches Pandharpur.", "நேரடி ரயில் – மாற்றம் இல்லை. பண்டரிபுரம் வருகிறது."), pickup: false, booking: "04 Dec 2026", starts: t("Mysuru, 02 Feb 15:45", "மைசூரு, 02 பிப். 15:45") },
            { no: "11014", name: t("CBE–LTT Express", "CBE–LTT எக்ஸ்பிரஸ்"), from: KSR, to: SOLAPUR, dep: "02 Feb 16:00", arr: "03 Feb 05:30", change: DIRECT, pickup: true, booking: "04 Dec 2026", starts: t("Coimbatore, 02 Feb 08:50", "கோயம்புத்தூர், 02 பிப். 08:50") },
            { no: "11302", name: t("Udyan Express", "உத்யான் எக்ஸ்பிரஸ்"), from: KSR, to: SOLAPUR, dep: "02 Feb 20:40", arr: "03 Feb 10:55", change: DIRECT, pickup: false, booking: "04 Dec 2026", starts: t("KSR Bengaluru, 02 Feb 20:40", "KSR பெங்களூரு, 02 பிப். 20:40") },
          ],
          notes: [
            t("The <b>Golgumbaz Express (16535)</b> goes all the way to Pandharpur, so no road transfer is needed.",
              "<b>கோல்கும்பாஸ் எக்ஸ்பிரஸ் (16535)</b> நேரடியாக பண்டரிபுரம் வரை செல்லும்; சாலைப் பயணம் தேவையில்லை."),
          ],
        },
        {
          city: t("Coimbatore", "கோயம்புத்தூர்"),
          intro: t("Runs daily.", "தினமும் இயங்கும்."),
          trains: [
            { no: "11014", name: t("CBE–LTT Express", "CBE–LTT எக்ஸ்பிரஸ்"), from: CBE, to: SOLAPUR, dep: "02 Feb 08:50", arr: "03 Feb 05:30", via: t("Tiruppur, Erode, Salem, Dharmapuri, Hosur", "திருப்பூர், ஈரோடு, சேலம், தர்மபுரி, ஓசூர்"), change: DIRECT, pickup: true, booking: "04 Dec 2026", starts: t("Coimbatore, 02 Feb 08:50", "கோயம்புத்தூர், 02 பிப். 08:50") },
          ],
        },
        {
          city: t("Madurai", "மதுரை"),
          trains: [
            { no: "22667 + 11014", name: t("NCJ–CBE SF Express to Erode, then CBE–LTT Express", "NCJ–CBE SF எக்ஸ்பிரஸ் (ஈரோடு வரை), பிறகு CBE–LTT எக்ஸ்பிரஸ்"), from: MADURAI, to: SOLAPUR, dep: t("02 Feb 01:40 (night of 1 Feb)", "02 பிப். 01:40 (1 பிப். இரவு)"), arr: "03 Feb 05:30", via: t("Dindigul, Karur, Erode, Salem, Dharmapuri, Hosur", "திண்டுக்கல், கரூர், ஈரோடு, சேலம், தர்மபுரி, ஓசூர்"), change: t("Same station (Erode Jn): arrive 05:10 → depart 10:25. Wait 5 h 15 min.", "அதே நிலையம் (ஈரோடு சந்திப்பு): 05:10 வருகை → 10:25 புறப்பாடு. காத்திருப்பு 5 ம 15 நி."), pickup: true, booking: "22667: 03 Dec 2026 · 11014: 04 Dec 2026", starts: t("Nagercoil 01 Feb 21:55 / Coimbatore 02 Feb 08:50", "நாகர்கோவில் 01 பிப். 21:55 / கோயம்புத்தூர் 02 பிப். 08:50") },
            { no: "12638 + 22158", name: t("Pandian SF Express to Chennai Egmore, then MS–CSMT SF Express", "பாண்டியன் SF எக்ஸ்பிரஸ் (சென்னை எழும்பூர் வரை), பிறகு MS–CSMT SF எக்ஸ்பிரஸ்"), from: MADURAI, to: SOLAPUR, dep: "01 Feb 21:25", arr: "02 Feb 21:45", via: t("Dindigul, Trichy, Chennai", "திண்டுக்கல், திருச்சி, சென்னை"), change: t("Same station (Chennai Egmore): arrive 05:20 → depart 06:35. Wait 1 h 15 min.", "அதே நிலையம் (சென்னை எழும்பூர்): 05:20 வருகை → 06:35 புறப்பாடு. காத்திருப்பு 1 ம 15 நி."), pickup: true, booking: "12638: 03 Dec 2026 · 22158: 04 Dec 2026", starts: t("Madurai 01 Feb 21:25 / Chennai Egmore 02 Feb 06:35", "மதுரை 01 பிப். 21:25 / சென்னை எழும்பூர் 02 பிப். 06:35") },
            { no: "12662 + 22158", name: t("Pothigai SF Express to Chennai Egmore, then MS–CSMT SF Express", "பொதிகை SF எக்ஸ்பிரஸ் (சென்னை எழும்பூர் வரை), பிறகு MS–CSMT SF எக்ஸ்பிரஸ்"), from: MADURAI, to: SOLAPUR, dep: "01 Feb 22:05", arr: "02 Feb 21:45", via: t("Dindigul, Trichy, Chennai", "திண்டுக்கல், திருச்சி, சென்னை"), change: t("Same station (Chennai Egmore): arrive 05:55 → depart 06:35. Wait 40 min – tight.", "அதே நிலையம் (சென்னை எழும்பூர்): 05:55 வருகை → 06:35 புறப்பாடு. காத்திருப்பு 40 நி – நெருக்கமானது."), warn: true, pickup: true, booking: "12662: 03 Dec 2026 · 22158: 04 Dec 2026", starts: t("Sengottai 01 Feb / Chennai Egmore 02 Feb 06:35", "செங்கோட்டை 01 பிப். / சென்னை எழும்பூர் 02 பிப். 06:35") },
            { no: "20636 + 22158", name: t("Anantapuri Express to Chennai Egmore, then MS–CSMT SF Express", "அனந்தபுரி எக்ஸ்பிரஸ் (சென்னை எழும்பூர் வரை), பிறகு MS–CSMT SF எக்ஸ்பிரஸ்"), from: MADURAI, to: SOLAPUR, dep: "01 Feb 21:45", arr: "02 Feb 21:45", via: t("Dindigul, Trichy, Chennai", "திண்டுக்கல், திருச்சி, சென்னை"), change: t("Same station (Chennai Egmore): arrive 06:05 → depart 06:35. Wait 30 min – risky if late.", "அதே நிலையம் (சென்னை எழும்பூர்): 06:05 வருகை → 06:35 புறப்பாடு. காத்திருப்பு 30 நி – தாமதமானால் அபாயகரமானது."), warn: true, pickup: true, booking: "20636: 03 Dec 2026 · 22158: 04 Dec 2026", starts: t("Kollam 01 Feb / Chennai Egmore 02 Feb 06:35", "கொல்லம் 01 பிப். / சென்னை எழும்பூர் 02 பிப். 06:35") },
            { no: "16235 + 16535", name: t("Tuticorin–Mysuru Express to KSR Bengaluru, then Golgumbaz Express", "தூத்துக்குடி–மைசூரு எக்ஸ்பிரஸ் (KSR பெங்களூரு வரை), பிறகு கோல்கும்பாஸ் எக்ஸ்பிரஸ்"), from: MADURAI, to: PANDHARPUR_DIRECT, dep: "01 Feb 20:15", arr: "03 Feb 12:25", via: t("Dindigul, Karur, Erode, Salem, Hosur", "திண்டுக்கல், கரூர், ஈரோடு, சேலம், ஓசூர்"), change: t("Same station (KSR Bengaluru): arrive 06:25 → depart 18:20. Long wait 11 h 55 min. Reaches Pandharpur.", "அதே நிலையம் (KSR பெங்களூரு): 06:25 வருகை → 18:20 புறப்பாடு. நீண்ட காத்திருப்பு 11 ம 55 நி. பண்டரிபுரம் வருகிறது."), warn: true, pickup: false, booking: "16235: 03 Dec 2026 · 16535: 04 Dec 2026", starts: t("Tuticorin 01 Feb 17:30 / Mysuru 02 Feb 15:45", "தூத்துக்குடி 01 பிப். 17:30 / மைசூரு 02 பிப். 15:45") },
            { no: "16340", name: t("Nagercoil–LTT Express", "நாகர்கோவில்–LTT எக்ஸ்பிரஸ்"), from: MADURAI, to: SOLAPUR, dep: "02 Feb 11:10", arr: "03 Feb 10:20", via: t("Dindigul, Karur, Salem, Katpadi", "திண்டுக்கல், கரூர், சேலம், காட்பாடி"), change: t("Direct to Solapur 10:20.", "நேரடி ரயில் – சோலாப்பூர் 10:20."), pickup: false, booking: "04 Dec 2026", starts: t("Nagercoil, 02 Feb 06:45", "நாகர்கோவில், 02 பிப். 06:45") },
          ],
          notes: [
            t("<b>22667 + 11014:</b> to board at Madurai at 01:40, reach the station on the night of 1 Feb. Booking opens on 3 Dec for 22667 and 4 Dec for 11014.",
              "<b>22667 + 11014:</b> மதுரையில் 01:40-க்கு ஏற 1 பிப். இரவே நிலையம் சேரவும். 22667-க்கு முன்பதிவு 3 டிச., 11014-க்கு 4 டிச. தொடங்கும்."),
            t("<b>Via Chennai Egmore:</b> the Pandian (1 h 15 min wait) is the safest; the Pothigai (40 min) is tight; the Anantapuri (30 min) is risky if it runs late. All three run daily.",
              "<b>சென்னை எழும்பூர் வழி:</b> பாண்டியன் (1 ம 15 நி காத்திருப்பு) மிகவும் பாதுகாப்பானது; பொதிகை (40 நி) நெருக்கமானது; அனந்தபுரி (30 நி) தாமதமானால் அபாயகரமானது. மூன்றும் தினமும் இயங்கும்."),
            t("<b>16235 + 16535:</b> about 12 hours of waiting at KSR Bengaluru, but the Golgumbaz goes straight to Pandharpur.",
              "<b>16235 + 16535:</b> KSR பெங்களூருவில் சுமார் 12 மணி நேரம் காத்திருக்க வேண்டும்; ஆனால் கோல்கும்பாஸ் நேரடியாக பண்டரிபுரம் வரும்."),
            t("You can take other trains to reach Chennai or Bengaluru, and from there take another train to Solapur or Pandharpur.",
              "வேறு ரயில்களில் சென்னை / பெங்களூரு வந்து அங்கிருந்தும் ரயிலில் சோலாப்பூர் அல்லது பண்டரிபுரம் வரலாம்."),
          ],
        },
        {
          city: t("Trichy", "திருச்சி"),
          intro: t("No direct train from Trichy fits these dates.", "திருச்சியிலிருந்து இந்த தேதிகளுக்கு நேரடி ரயில் இல்லை."),
          trains: [],
          notes: [
            t("You can take other trains to reach Chennai or Bengaluru, and from there take another train to Solapur or Pandharpur.",
              "வேறு ரயில்களில் சென்னை / பெங்களூரு வந்து அங்கிருந்தும் ரயிலில் சோலாப்பூர் அல்லது பண்டரிபுரம் வரலாம்."),
            t("Reach Karur by road or local train before 1:00 PM to board <b>16340 Nagercoil–LTT Express</b> (see Madurai route).",
              "<b>16340 நாகர்கோவில்–LTT எக்ஸ்பிரஸில்</b> ஏற, மதியம் 1 மணிக்கு முன் சாலை அல்லது ரயில் மூலம் கரூர் சென்றடையவும் (மதுரை வழித்தடம் பார்க்கவும்)."),
          ],
        },
      ],
    },

    /* ------------------------------------------------------------ RETURN */
    return: {
      window: t(
        "Leave Solapur / Pandharpur between the afternoon of <b>7 Feb 2027 (Sunday)</b> and the morning of <b>8 Feb 2027 (Monday)</b>.",
        "<b>7 பிப்ரவரி 2027 (ஞாயிறு)</b> மதியம் முதல் <b>8 பிப்ரவரி 2027 (திங்கள்)</b> காலை வரை சோலாப்பூர் / பண்டரிபுரத்திலிருந்து புறப்படலாம்."
      ),
      notes: [
        t("Booking for trains from Solapur / Pandharpur opens on <b>Wednesday 9 Dec 2026 at 8:00 AM</b> on IRCTC.",
          "சோலாப்பூர் / பண்டரிபுரத்திலிருந்து புறப்படும் ரயில்களுக்கு முன்பதிவு <b>புதன் 9 டிசம்பர் 2026 காலை 8:00 மணிக்கு</b> IRCTC-யில் தொடங்கும்."),
        t("Connecting trains from Chennai, Bengaluru or Erode (for Madurai and Trichy) open on <b>Thursday 10 Dec 2026</b>, because they start on 8 Feb.",
          "மதுரை, திருச்சிக்கான இணைப்பு ரயில்கள் (சென்னை, பெங்களூரு, ஈரோட்டிலிருந்து) 8 பிப்ரவரி அன்று புறப்படுவதால், அவற்றுக்கு முன்பதிவு <b>வியாழன் 10 டிசம்பர் 2026</b> அன்று தொடங்கும்."),
        t("Timings are from the current railway timetable (Oct 2026). Please re-check each train on IRCTC when you book.",
          "நேரங்கள் தற்போதைய ரயில் அட்டவணைப்படி (அக்டோபர் 2026) உள்ளன. முன்பதிவு செய்யும்போது IRCTC-யில் மீண்டும் சரிபார்க்கவும்."),
      ],
      routes: [
        {
          city: t("Chennai", "சென்னை"),
          intro: t("All three trains run daily and start from Mumbai on 7 Feb. Reach Solapur from Pandharpur by road (about 72 km) before departure.",
                   "மூன்று ரயில்களும் தினமும் இயங்கும்; 7 பிப். அன்று மும்பையிலிருந்து புறப்படுகின்றன. புறப்படும் நேரத்திற்கு முன் பண்டரிபுரத்திலிருந்து சாலை வழியாக (சுமார் 72 கி.மீ.) சோலாப்பூர் சென்றடையவும்."),
          trains: [
            { no: "22159", name: t("CSMT–MAS Express", "CSMT–MAS எக்ஸ்பிரஸ்"), from: SOLAPUR, to: CENTRAL, dep: "07 Feb 20:00", arr: "08 Feb 10:45", via: ARAKKONAM, change: DIRECT, pickup: true, pickupNote: DROP_630, booking: "09 Dec 2026", starts: t("CSMT Mumbai, 07 Feb 12:45", "CSMT மும்பை, 07 பிப். 12:45") },
            { no: "12163", name: t("LTT–MAS Express", "LTT–MAS எக்ஸ்பிரஸ்"), from: SOLAPUR, to: CENTRAL, dep: "08 Feb 01:50", arr: "08 Feb 16:10", via: ARAKKONAM, change: DIRECT, pickup: true, pickupNote: DROP_630, booking: "09 Dec 2026", starts: t("LTT Mumbai, 07 Feb 18:30", "LTT மும்பை, 07 பிப். 18:30") },
            { no: "22157", name: t("CSMT–MS SF Mail", "CSMT–MS SF மெயில்"), from: SOLAPUR, to: EGMORE, dep: "08 Feb 06:55", arr: "08 Feb 22:15", via: ARAKKONAM, change: DIRECT, pickup: true, pickupNote: DROP_1AM, booking: "09 Dec 2026", starts: t("CSMT Mumbai, 07 Feb 22:52", "CSMT மும்பை, 07 பிப். 22:52") },
          ],
        },
        {
          city: t("Bengaluru", "பெங்களூரு"),
          trains: [
            { no: "16536", name: t("Golgumbaz Express", "கோல்கும்பாஸ் எக்ஸ்பிரஸ்"), best: true, from: t("Pandharpur 13:00 (Solapur 15:30)", "பண்டரிபுரம் 13:00 (சோலாப்பூர் 15:30)"), to: KSR, dep: "07 Feb 13:00", arr: "08 Feb 07:20", change: DIRECT, pickup: false, booking: "09 Dec 2026", starts: t("Pandharpur, 07 Feb 13:00", "பண்டரிபுரம், 07 பிப். 13:00") },
            { no: "11301", name: t("Udyan Express", "உத்யான் எக்ஸ்பிரஸ்"), from: SOLAPUR, to: t("KSR Bengaluru (Bengaluru Cantt 05:08)", "KSR பெங்களூரு (பெங்களூரு கண்டோன்மென்ட் 05:08)"), dep: "07 Feb 15:40", arr: "08 Feb ~06:00", change: DIRECT, pickup: false, booking: "09 Dec 2026", starts: t("CSMT Mumbai, 07 Feb ~08:00", "CSMT மும்பை, 07 பிப். ~08:00") },
          ],
          notes: [
            t("The <b>Golgumbaz Express (16536)</b> starts from Pandharpur itself, so no road transfer is needed.",
              "<b>கோல்கும்பாஸ் எக்ஸ்பிரஸ் (16536)</b> பண்டரிபுரத்திலிருந்தே புறப்படும்; சாலைப் பயணம் தேவையில்லை."),
          ],
        },
        {
          city: t("Coimbatore", "கோயம்புத்தூர்"),
          trains: [
            { no: "16381", name: t("Pune–Kanyakumari Express", "புனே–கன்னியாகுமரி எக்ஸ்பிரஸ்"), from: SOLAPUR, to: CBE, dep: "08 Feb 03:30", arr: "08 Feb 23:40", via: t("Jolarpettai, Salem, Erode, Tiruppur", "ஜோலார்பேட்டை, சேலம், ஈரோடு, திருப்பூர்"), change: DIRECT, pickup: true, pickupNote: t("Drop at Solapur by 1:00 AM (together for all trains).", "எல்லா ரயில்களுக்கும் சேர்த்து அதிகாலை 1:00 மணிக்குள் சோலாப்பூரில் இறக்கி விடுவோம்."), booking: "09 Dec 2026", starts: t("Pune, 07 Feb 23:45", "புனே, 07 பிப். 23:45") },
            { no: "16331", name: t("LTT–Trivandrum Express", "LTT–திருவனந்தபுரம் எக்ஸ்பிரஸ்"), from: SOLAPUR, to: CBE, dep: "08 Feb 03:50", arr: "08 Feb 22:22", via: t("Salem, Erode, Tiruppur", "சேலம், ஈரோடு, திருப்பூர்"), change: DIRECT, pickup: true, pickupNote: t("Drop at Solapur by 1:00 AM (together for all trains).", "எல்லா ரயில்களுக்கும் சேர்த்து அதிகாலை 1:00 மணிக்குள் சோலாப்பூரில் இறக்கி விடுவோம்."), booking: "09 Dec 2026", starts: t("LTT Mumbai, 07 Feb 20:55", "LTT மும்பை, 07 பிப். 20:55") },
            { no: "11013", name: t("LTT–CBE Express", "LTT–CBE எக்ஸ்பிரஸ்"), from: SOLAPUR, to: CBE, dep: "08 Feb 06:05", arr: "09 Feb 06:50", via: t("Hosur, Salem, Erode, Tiruppur", "ஓசூர், சேலம், ஈரோடு, திருப்பூர்"), change: DIRECT, pickup: true, pickupNote: t("Drop at Solapur by 1:00 AM (together for all trains).", "எல்லா ரயில்களுக்கும் சேர்த்து அதிகாலை 1:00 மணிக்குள் சோலாப்பூரில் இறக்கி விடுவோம்."), booking: "09 Dec 2026", starts: t("LTT Mumbai, 07 Feb 22:35", "LTT மும்பை, 07 பிப். 22:35") },
          ],
          notes: [
            t("16381 and 11013 run daily; 16331 leaves Mumbai only on Sundays, which matches the Monday 8 Feb departure from Solapur.",
              "16381, 11013 தினமும் இயங்கும்; 16331 ஞாயிறு மட்டுமே மும்பையிலிருந்து புறப்படும் — இது 8 பிப். திங்கள் சோலாப்பூர் புறப்பாட்டுடன் பொருந்துகிறது."),
            t("All three start from Pune / Mumbai on 7 Feb, so booking opens on 9 Dec.",
              "மூன்றும் 7 பிப். அன்று புனே / மும்பையிலிருந்து புறப்படுவதால் முன்பதிவு 9 டிச. தொடங்கும்."),
            t("These trains leave Solapur early on 8 Feb, so reach Solapur from Pandharpur by road on the evening of 7 Feb.",
              "இந்த ரயில்கள் 8 பிப். அதிகாலையில் சோலாப்பூரிலிருந்து புறப்படுவதால், 7 பிப். மாலையே சாலை வழியாக சோலாப்பூர் சென்றடையவும்."),
          ],
        },
        {
          city: t("Madurai", "மதுரை"),
          intro: t("No direct train from Solapur to Madurai fits these dates, so use one of these connections. <b>Book both trains.</b>",
                   "சோலாப்பூரிலிருந்து மதுரைக்கு இந்த தேதிகளுக்கு நேரடி ரயில் இல்லை; கீழே உள்ள இணைப்புகளில் ஒன்றைப் பயன்படுத்தவும். <b>இரண்டு ரயில்களுக்கும் முன்பதிவு செய்யவும்.</b>"),
          trains: [
            { no: "22159 + 12635", name: t("Via Chennai (1)", "சென்னை வழி (1)"), from: SOLAPUR, to: MADURAI, dep: "07 Feb 20:00", arr: "08 Feb 20:35",
              legs: [t("22159 Solapur 07 Feb 20:00 → Chennai Central 08 Feb 10:45", "22159 சோலாப்பூர் 07 பிப். 20:00 → சென்னை சென்ட்ரல் 08 பிப். 10:45"),
                     t("12635 Vaigai SF Express, Chennai Egmore 08 Feb 13:15 → Madurai 20:35", "12635 வைகை SF எக்ஸ்பிரஸ், சென்னை எழும்பூர் 08 பிப். 13:15 → மதுரை 20:35")],
              via: t("Trichy, Dindigul", "திருச்சி, திண்டுக்கல்"), change: t("Change at Chennai: arrive Central 10:45 → depart Egmore 13:15 (move ~3 km). Wait 2 h 30 min. Change of station – tight.", "சென்னையில் மாற்றம்: சென்ட்ரல் 10:45 வருகை → எழும்பூர் 13:15 புறப்பாடு (சுமார் 3 கி.மீ.). காத்திருப்பு 2 ம 30 நி. ரயில் நிலையம் மாற வேண்டும் – நெருக்கமானது."), warn: true,
              pickup: true, pickupNote: t("Drop at Solapur by 6:30 PM.", "மாலை 6:30 மணிக்குள் சோலாப்பூரில் இறக்கி விடுவோம்."), booking: "22159: 09 Dec 2026 · 12635: 10 Dec 2026", starts: t("22159: CSMT 07 Feb 12:45 · 12635: Chennai Egmore 08 Feb", "22159: CSMT 07 பிப். 12:45 · 12635: சென்னை எழும்பூர் 08 பிப்.") },
            { no: "12163 + 12637", name: t("Via Chennai (2)", "சென்னை வழி (2)"), from: SOLAPUR, to: MADURAI, dep: "08 Feb 01:50", arr: "09 Feb 05:25",
              legs: [t("12163 Solapur 08 Feb 01:50 → Chennai Central 16:10", "12163 சோலாப்பூர் 08 பிப். 01:50 → சென்னை சென்ட்ரல் 16:10"),
                     t("12637 Pandian SF Express, Chennai Egmore 08 Feb 21:40 → Madurai 09 Feb 05:25", "12637 பாண்டியன் SF எக்ஸ்பிரஸ், சென்னை எழும்பூர் 08 பிப். 21:40 → மதுரை 09 பிப். 05:25")],
              via: t("Trichy, Dindigul", "திருச்சி, திண்டுக்கல்"), change: t("Change at Chennai: arrive Central 16:10 → depart Egmore 21:40 (move ~3 km). Wait 5 h 30 min.", "சென்னையில் மாற்றம்: சென்ட்ரல் 16:10 வருகை → எழும்பூர் 21:40 புறப்பாடு (சுமார் 3 கி.மீ.). காத்திருப்பு 5 ம 30 நி."), warn: true,
              pickup: true, pickupNote: t("Drop at Solapur by 6:30 PM.", "மாலை 6:30 மணிக்குள் சோலாப்பூரில் இறக்கி விடுவோம்."), booking: "12163: 09 Dec 2026 · 12637: 10 Dec 2026", starts: t("12163: LTT 07 Feb 18:30 · 12637: Chennai Egmore 08 Feb", "12163: LTT 07 பிப். 18:30 · 12637: சென்னை எழும்பூர் 08 பிப்.") },
            { no: "11301 + 20672", name: t("Via Bengaluru", "பெங்களூரு வழி"), from: SOLAPUR, to: MADURAI, dep: "07 Feb 15:40", arr: "08 Feb 21:45",
              legs: [t("11301 Udyan Express, Solapur 07 Feb 15:40 → Bengaluru Cantt 08 Feb 05:08", "11301 உத்யான் எக்ஸ்பிரஸ், சோலாப்பூர் 07 பிப். 15:40 → பெங்களூரு கண்டோன்மென்ட் 08 பிப். 05:08"),
                     t("20672 Vande Bharat, Bengaluru Cantt 08 Feb 13:30 → Madurai 21:45", "20672 வந்தே பாரத், பெங்களூரு கண்டோன்மென்ட் 08 பிப். 13:30 → மதுரை 21:45")],
              via: t("Salem, Karur, Trichy, Dindigul", "சேலம், கரூர், திருச்சி, திண்டுக்கல்"), change: t("Same station (Bengaluru Cantt): arrive 05:08 → depart 13:30. Wait 8 h 20 min.", "அதே நிலையம் (பெங்களூரு கண்டோன்மென்ட்): 05:08 வருகை → 13:30 புறப்பாடு. காத்திருப்பு 8 ம 20 நி."), warn: true,
              pickup: false, booking: "11301: 09 Dec 2026 · 20672: 10 Dec 2026", starts: t("11301: CSMT 07 Feb · 20672: Bengaluru Cantt 08 Feb", "11301: CSMT 07 பிப். · 20672: பெங்களூரு கண்டோன்மென்ட் 08 பிப்.") },
            { no: "16381 + 16236", name: t("Via Erode", "ஈரோடு வழி"), from: SOLAPUR, to: MADURAI, dep: "08 Feb 03:30", arr: "09 Feb 07:25",
              legs: [t("16381 Solapur 08 Feb 03:30 → Erode 21:55", "16381 சோலாப்பூர் 08 பிப். 03:30 → ஈரோடு 21:55"),
                     t("16236 Mysuru–Tuticorin Express, Erode 09 Feb 03:35 → Madurai 07:25", "16236 மைசூரு–தூத்துக்குடி எக்ஸ்பிரஸ், ஈரோடு 09 பிப். 03:35 → மதுரை 07:25")],
              via: t("Erode, Dindigul", "ஈரோடு, திண்டுக்கல்"), change: t("Same station (Erode Jn): arrive 21:55 → depart 03:35. Wait 5 h 40 min (overnight).", "அதே நிலையம் (ஈரோடு சந்திப்பு): 21:55 வருகை → 03:35 புறப்பாடு. காத்திருப்பு 5 ம 40 நி (இரவு)."), warn: true,
              pickup: true, pickupNote: t("Drop at Solapur by 1:00 AM.", "அதிகாலை 1:00 மணிக்குள் சோலாப்பூரில் இறக்கி விடுவோம்."), booking: "16381: 09 Dec 2026 · 16236: 10 Dec 2026", starts: t("16381: Pune 07 Feb 23:45 · 16236: Mysuru 08 Feb 18:20", "16381: புனே 07 பிப். 23:45 · 16236: மைசூரு 08 பிப். 18:20") },
          ],
          notes: [
            t("For the Chennai connections, the trains from Solapur arrive at <b>Chennai Central</b>, but the Vaigai and Pandian leave from <b>Chennai Egmore</b>, about 3 km away. Allow time for the transfer.",
              "சென்னை இணைப்புகளில், சோலாப்பூர் ரயில்கள் <b>சென்னை சென்ட்ரல்</b> வரும்; ஆனால் வைகை, பாண்டியன் ரயில்கள் சுமார் 3 கி.மீ. தொலைவிலுள்ள <b>சென்னை எழும்பூரிலிருந்து</b> புறப்படும். மாற்றத்திற்குப் போதிய நேரம் ஒதுக்கவும்."),
            t("The Erode option involves a long overnight wait at Erode.", "ஈரோடு வழியில் இரவில் நீண்ட காத்திருப்பு உள்ளது."),
          ],
        },
        {
          city: t("Trichy", "திருச்சி"),
          intro: t("No direct train fits these dates. Use the <b>Madurai connections</b> and get down at Trichy.",
                   "இந்த தேதிகளுக்கு நேரடி ரயில் இல்லை. <b>மதுரை இணைப்பு ரயில்களைப்</b> பயன்படுத்தி திருச்சியில் இறங்கவும்."),
          trains: [],
        },
      ],
    },
  };
})();
