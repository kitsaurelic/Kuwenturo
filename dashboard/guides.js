// Gabay Aralin content, copied from the Figma frames (section 4646:1086, "Kuwento 1").
// Each story id matches a key in LESSONS (dashboard.js). Section tone picks the header colour.
// In lists, class="is-answer" marks the highlighted answer the frame shows in bold.
window.KUWENTURO_GUIDES = {
  'ang-pamilyang-puno-ng-pagmamahal': {
    thumb: 'thumb-ang-pamilyang-puno-ng-pagmamahal.jpg',
    paksa: 'Pagmamahalan, Pag-aaruga, at Pagkakaunawaan sa Pamilya',
    aral: 'Mahalaga ang pagmamahalan sa pamilya upang manatili itong nagkakaisa.',
    salita: 104,
    vocab: [
      ['Pamilya', 'Mga taong nagmamahalan at nag-aalaga sa isa\'t isa.'],
      ['Barangay', 'Lugar kung saan nakatira ang mga tao at pamilya.'],
      ['Nagtaka', 'Nag-isip kung bakit o paano nangyari ang isang bagay.'],
      ['Umiling', 'Paggalaw ng ulo upang ipakita ang hindi pagpayag o hindi pagsang-ayon.'],
      ['Naunawaan', 'Naintindihan ang isang bagay.'],
    ],

    // Figma 4595:44090 BAGO BASAHIN
    'bago-basahin': [
      {
        title: 'Misyon', tone: 'green',
        html: `<p>Alamin na may iba’t ibang uri ng pamilya at tuklasin na ang pagmamahal, pag-aalaga, at pagtanggap ang mahalagang bumubuo sa isang pamilya.</p>`,
      },
      {
        title: 'Layunin', tone: 'yellow',
        html: `<p>Sa pagtatapos ng aralin, inaasahang matutukoy ng mga mag-aaral:</p>
          <ul>
            <li>Ang mga detalye ng kuwento na nagpapakita ng pagmamahal at pag-aalaga ng pamilya.</li>
            <li>Ang aral ng kuwento tungkol sa pagtanggap at paggalang sa iba’t ibang uri ng pamilya.</li>
            <li>Ang mga pangunahing tauhan, tagpuan, at mahahalagang pangyayari sa kuwento.</li>
            <li>Ang pagkakasunod-sunod ng mahahalagang pangyayari mula simula, gitna, at wakas.</li>
          </ul>`,
      },
      {
        title: 'Hulaan', tone: 'red',
        html: `<p>Batay sa pamagat at larawan, tungkol saan kaya ang kwento?</p>
          <ul>
            <li class="is-answer">Matutuklasan ni Biboy na kahit iba ang pamilya ni Popoy, puno pa rin ito ng pagmamahal.</li>
            <li>Matutuklasan ni Biboy na kinakahiya ni Popoy ang kanyang pamilya.</li>
            <li>Matutuklasan ni Biboy na walang pamilyang nag-aalaga kay Popoy.</li>
          </ul>`,
      },
    ],

    // Figma 4595:44117 BASAHIN
    basahin: [
      {
        title: 'Ang Pamilyang Puno ng Pagmamahal', tone: 'green',
        html: `<p>Habang naglalakad sa aming barangay, nakita ko ang kaibigan kong si Popoy.</p>
          <p>“Popoy! Papasok ka na ba sa paaralan? Sabay na tayo!” tawag ko.</p>
          <p>“Hindi. Aalis kami ng mga mama ko,” sagot niya.</p>
          <p>“Mga mama? Hindi ba mama at papa ang bumubuo ng pamilya?” pagtataka ko.</p>
          <p>Umiling si Popoy. “Dalawa ang mama ko. Inaalagaan nila ako kapag may sakit, niyayakap kapag malungkot, at tinutulungan kapag nahihirapan. Mahal na mahal nila ako.”</p>
          <p>Lumabas ang dalawang mama niya at niyakap siya.</p>
          <p>Napangiti ako.</p>
          <p>Doon ko naunawaan.</p>
          <p>Magkaiba man ang pamilya namin, pareho naman kaming minamahal.</p>
          <p><strong><em>Hindi kailangang magkapareho ang mga pamilya, basta’t puno ng pagmamahal.</em></strong></p>`,
      },
    ],

    // Figma 4595:44133 PAGKATAPOS BASAHIN
    'pagkatapos-basahin': [
      {
        title: 'Tuklasin', tone: 'green',
        html: `<h4>Tauhan</h4>
          <ol start="1"><li>Si Popoy ay mayroong dalawang mama (Tauhan ba sila sa kuwento?)</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “OPO”</strong><br><strong><em>“Dalawa talaga ang mama ko”</em> kabilang sila sa mga tauhan ng kwento.</strong></p>
          <h4>Tagpuan</h4>
          <ol start="2"><li>Habang naglalakad sa baranggay, nakita ni Biboy si Popoy</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “OPO”</strong><br><strong><em>“Habang naglalakad sa aming barangay”</em> Tagpuan ito sa kwento.</strong></p>
          <h4>Pangyayari</h4>
          <ol start="3"><li>Sa tuwing nalulungkot si Popoy, niyayakap, siya ng kanyang mga magulang (Pangyayari ba ito sa kuwento?)</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “OPO”</strong><br><strong><em>“Kapag malungkot ako, niyayakap nila ako.”</em> Pangyayari ito sa kuwento.</strong></p>
          <ol start="4"><li>Sa tuwing nalulungkot si Popoy, niyayakap, siya ng kanyang mga magulang (Pangyayari ba ito sa kuwento?)</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “OPO”</strong><br><strong><em>“Kapag malungkot ako, niyayakap nila ako.”</em> Pangyayari ito sa kuwento.</strong></p>
          <ol start="5"><li>Inaalagaan ng mga magulang si Popoy sa tuwing may sakit siya (Pangyayari ba ito sa kuwento?)</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “OPO”</strong><br><strong><em>“Kapag may sakit ako, inaalagaan nila ako.”</em> Pangyayari ito sa kuwento.</strong></p>
          <ol start="6"><li>Kapag nahihirapan si Popoy, tinutulungan siya ng kanyang mga magulang (Pangyayari ba ito sa kuwento?)</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “OPO”</strong><br><strong><em>“Kapag nahihirapan ako, tinutulungan nila ako.”</em> Pangyayari ito sa kuwento.</strong></p>
          <ol start="7"><li>Hindi tanggap ni Popoy ang kanyang mga magulang kaya tinago niya ito kay Biboy (Pangyayari ba ito sa kuwento?)</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “HINDI PO”</strong><br><strong><em>“Mahal na mahal ko rin sila”</em> Mahal ni Biboy ang kanyang mga magulang.</strong></p>
          <h4>Aral</h4>
          <ol start="8"><li>Natutunan ni Biboy na ang tunay na pamilya ay punong-puno ng pagmamahal (Aral ba ito sa kuwento?)</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “OPO”</strong><br><strong><em>“Dahil ang tunay na pamilya ay punong-puno ng pagmamahal”</em></strong></p>
          <ol start="9"><li>Natutunan ni Biboy na ang tunay na pamilya ay binubuo lamang ng nanay at tatay (Aral ba ito sa kuwento?)</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “HINDI PO”</strong><br><strong><em>“Hindi mahalaga kung sino ang kasama sa pamilya”</em> Magkakaiba ang pamilya.</strong></p>`,
      },
      {
        title: 'Suriin', tone: 'yellow',
        html: `<h4>Tauhan</h4>
          <ol start="1"><li>Sino-sino ang mga tauhan na ipinakilala sa kuwento?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Biboy, Popoy, at ang dalawang mama ni Popoy</p>
          <h4>Tagpuan</h4>
          <ol start="2"><li>Saang lugar naglalakad si Popoy nang makita niya si Biboy?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Sa barangay / Sa bahay ni Popoy</p>
          <h4>Pangyayari</h4>
          <ol start="3"><li>Ano ang ginawa ni Biboy noong nakita niya si Popoy?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Tinawag ni Biboy si Popoy / Niyaya ni Biboy si Popoy na sabay silang pumasok sa paaralan</p>
          <ol start="4"><li>Ano ang nalaman ni Biboy tungkol sa mga magulang ni Popoy?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Nalaman ni Biboy na dalawa ang mama ni Popoy</p>
          <ol start="5"><li>Paano ipinakita ng mga magulang ang kanilang pagmamahal?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Kapag nalulungkot siya; <em>Niyayakap</em>, Kapag may sakit siya; <em>Inaalagaan</em>, Kapag nahihirapan siya; <em>Tinutulungan</em></p>
          <h4>Aral</h4>
          <ol start="6"><li>Ano ang natutunan ni Popoy tungkol sa pamilya?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ang tunay na pamilya ay punong-puno ng pagmamahal / Iba-iba ang bawat pamilya</p>`,
      },
      {
        title: 'Paglalagom', tone: 'red',
        html: `<h4>Simula</h4>
          <ol start="1"><li>Ano ang unang nalaman ni Biboy tungkol sa pamilya ni Popoy na ikinagulat niya?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Nalaman ni Biboy na may dalawang mama si Popoy. Nagtaka siya dahil iba ito sa kaniyang inaasahang pamilya.</p>
          <h4>Gitna</h4>
          <ol start="2"><li>Paano ipinaliwanag ni Biboy na pamilya pa rin ang may dalawang mama?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ipinaliwanag ni Popoy na tulad din ng ibang pamilya, niyayakap, inaalagaan, tinutulungan, at mahal siya ng kaniyang dalawang mama.</p>
          <h4>Wakas</h4>
          <ol start="3"><li>Ano ang natutuhan ni Biboy tungkol sa tunay na pamilya?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Natutuhan ni Biboy na maaaring magkakaiba ang anyo ng pamilya. Ang tunay na pamilya ay may pagmamahal, pag-aalaga, at pagtanggap sa isa't isa.</p>
          <h4>Kabuuan</h4>
          <p>Nakita ni Biboy si Popoy habang naglalakad sa kanilang barangay. Nalaman niya na may dalawang mama si Popoy kaya siya ay nagtaka. Ikinuwento ni Popoy na siya ay minamahal, inaalagaan, at tinutulungan ng kanyang mga mama sa iba’t ibang pagkakataon. Habang nakikilala ni Biboy ang pamilya ni Popoy, nakita niya na ang pagmamahal at pag-aalaga ang mahalagang bahagi ng isang pamilya. Sa huli, natutunan ni Biboy na maaaring magkakaiba ang uri ng pamilya, ngunit ang bawat pamilya ay maaaring maging puno ng pagmamahal.</p>`,
      },
      {
        title: 'Totoong Buhay', tone: 'blue',
        html: `<p class="question">May kaklase kang nagsabi, “Dalawa lang kami sa bahay, ako at ang tatay ko.” Ano ang magandang sagot?</p>
          <ul>
            <li>“Mas masaya kaya kapag buo ang pamilya.”</li>
            <li>“Lahat ng pamilya ay kinakailangan ng nanay.”</li>
            <li class="is-answer">“Ang mahalaga ay masaya at nagmamahalan kayo.”</li>
          </ul>
          <p class="question">May kaklase kang ang tito at tita ang kasama niya sa “Family Day” dahil wala roon ang kaniyang mga magulang. Ano ang sasabihin mo?</p>
          <ul>
            <li>“Sayang naman, hindi ka sinamahan ng mga magulang mo.”</li>
            <li class="is-answer">“Pamilya mo rin naman sila at mahal ka nila.”</li>
            <li>“Hindi kabilang sa ‘Family Day’ ang mga tito at tita.”</li>
          </ul>
          <p class="question">Ikinuwento ng kaklase mo na inaalagaan siya ng kaniyang lola dahil wala ang mga magulang niya. Ano ang sasabihin mo?</p>
          <ul>
            <li class="is-answer">“Mabuti at may nag-aalaga sa iyo at nagmamahal sa iyo.”</li>
            <li>“Hindi mo tunay na pamilya ang lola mo.”</li>
            <li>“Mas maganda ang pamilya ko kaysa sa iyo.”</li>
          </ul>`,
      },
    ],
  },

  // Section 4646:1089, "Kuwento 2" (Gabay page 4646:2015)
  'ang-angking-galing-ni-ika': {
    thumb: 'thumb-ang-angking-galing-ni-ika.jpg',
    paksa: 'Paggalang at Pagtanggap sa Pagkakaiba ng Bawat Isa',
    aral: 'Mahalagang tanggapin ang pagkakaiba ng bawat isa, may kapansanan man o wala.',
    salita: 223,
    vocab: [
      ['Wheelchair', 'Upuang may gulong na tumutulong sa isang tao na makagalaw.'],
      ['Talento', 'Espesyal na galing o kakayahan ng isang tao.'],
      ['Hadlang', 'Bagay o sitwasyon na nagpapahirap sa paggawa ng isang bagay.'],
      ['Rosaryo', 'Kwintas na ginagamit ng ilang tao sa pagdarasal.'],
      ['Paglikha', 'Paggawa ng isang bagay gamit ang ideya at talento.'],
    ],

    // Figma 4646:2197 (panel 4646:2380)
    'bago-basahin': [
      {
        title: 'Misyon', tone: 'green',
        html: `<p>Alamin na bawat tao ay may kanya-kanyang espesyal na kakayahan at talento kahit may mga bagay na maaaring mahirap gawin.</p>`,
      },
      {
        title: 'Layunin', tone: 'yellow',
        html: `<p>Sa pagtatapos ng aralin, inaasahang matutukoy ng mga mag-aaral:</p>
          <ul>
            <li>Ang mga detalye ng kuwento na nagpapakita ng talento at kakayahan ni Ika.</li>
            <li>Ang aral tungkol sa pagtanggap at pagpapahalaga sa kakayahan ng bawat isa.</li>
            <li>Ang mga pangunahing tauhan, tagpuan, at mahahalagang pangyayari sa kuwento.</li>
            <li>Ang pagkakasunod-sunod ng mahahalagang pangyayari mula simula, gitna, at wakas.</li>
          </ul>`,
      },
      {
        title: 'Hulaan', tone: 'red',
        html: `<p>Batay sa pamagat at larawan, tungkol saan kaya ang kwento?</p>
          <ul>
            <li>Isang batang ayaw subukan ang anumang gawain.</li>
            <li class="is-answer">Isang batang gumagamit ng kaniyang talento upang gumawa ng mga likha at makatulong.</li>
            <li>Isang batang ayaw makipagkaibigan sa kahit kaninong kapwa.</li>
          </ul>`,
      },
    ],

    // Figma 4646:2400 (panel 4646:2585)
    basahin: [
      {
        title: 'Ang Angking Galing ni Ika', tone: 'green',
        html: `<p>Maraming taong nakapula sa tapat ng simbahan.</p>
          <p>May nakita akong lola at batang babae na naka-wheelchair sa tapat ng simbahan.</p>
          <p>Maraming tao ang humihinto sa kanila.</p>
          <p>Lumapit ako.</p>
          <p>May mga rosaryo, bulaklak na gawa sa papel, at makukulay na dekorasyon sa mesa nila.</p>
          <p>“Oh, iho, ano ang sa iyo?” tanong ng lola.</p>
          <p>Hindi ako agad nakasagot.</p>
          <p>Napatingin ako sa batang babae.</p>
          <p>Napaisip ako.</p>
          <p>Ano kaya ang pakiramdam na hindi makatakbo at makapaglaro tulad ng ibang bata?</p>
          <p>“Ay, gusto ko lang po malaman kung sino ang gumawa ng mga ito,” sabi ko.</p>
          <p>Ngumiti ang lola.</p>
          <p>“Itong apo ko. Si Ika. Hilig at kasiyahan niya ito. Tumutulong siya tuwing Sabado upang may pandagdag baon.”</p>
          <p>Napatingin ako kay Ika.</p>
          <p>Abala siya sa paggupit ng papel at pagdikit ng mga bulaklak.</p>
          <p>Napansin kong nakangiti siya habang gumagawa.</p>
          <p>“Ang paglikha gamit ang kamay ay talento na ibinigay ng Diyos sa akin.” sabi ni Ika.</p>
          <p>“Hindi ka ba naiinggit sa ibang bata?” tanong ko.</p>
          <p>“Hindi man ako katulad nila, may kulang man, pero masaya ako sa kung ano ang meron ako.”</p>
          <p>“Ang galing mo, Ika! Inspirasyon ka sa amin.”</p>
          <p>Pag-alis ko, napaisip ako.</p>
          <p>Iba-iba pala ang galing natin.</p>
          <p>Ang madali sa iba ay maaaring mahirap sa atin.</p>
          <p>Gaya ni Ika,</p>
          <p>Hindi kailanman naging hadlang ang pagiging iba para sumaya.</p>
          <p>May angking galing tayo</p>
          <p><strong><em>At ito ang kumukumpleto sa atin.</em></strong></p>`,
      },
    ],

    // Figma 4646:2592 (panel 4646:2778)
    'pagkatapos-basahin': [
      {
        title: 'Tuklasin', tone: 'green',
        html: `<h4>Tagpuan</h4>
          <ol start="1"><li>Saang tagpuan nakita ni Biboy na nagtitinda si Ika, kung saan maraming tao?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Sa tapat ng simbahan ang tagpuan kung saan nagtitinda si Ika.</p>
          <h4>Tauhan</h4>
          <ol start="2"><li>Batay sa kuwentong nabasa, sino kayang tauhan ang kasama ni Ika sa pagtitinda?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Si lola ang tauhan na kasama ni Ika sa kuwento.</p>
          <h4>Hilig</h4>
          <ol start="3"><li>Ano kaya ang hilig o kasiyahan ni Ika na pinagkakakitaan niya?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ang paglikha ang hilig at kasiyahan ni Ika na ginagawa niyang pagkakakitaan.</p>
          <h4>Bagay</h4>
          <ol start="4"><li>Anong bagay ang ginagawa ni Ika gamit ang papel at nagsisilbing kanyang paninda?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ang mga puting bulaklak na gawa sa papel ang bagay na ginagawa ni Ika.</p>`,
      },
      {
        title: 'Suriin', tone: 'yellow',
        html: `<h4>Bagay</h4>
          <ol start="1"><li>Ano ang nililikha ni Ika upang maipakita ang kanyang husay?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Rosaryo, bulaklak at mga dekorasyon na gawa sa papel</p>
          <h4>Pangyayari</h4>
          <ol start="2"><li>Bakit kaya tumutulong si Ika sa pagtitinda?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Upang magkaroon si Ika ng dagdag baon sa kanyang pag-aaral</p>
          <h4>Pangyayari</h4>
          <ol start="3"><li>Ano kaya ang talento na ipinapakita ni Ika?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ang paglikha ng mga paninda gamit ang kanyang mga kamay</p>
          <h4>Aral</h4>
          <ol start="4"><li>Ano ang natutuhan ni Biboy matapos makilala si Ika?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Iba-iba ang galing ng bawat tao / Hindi hadlang ang pagiging iba para sumaya</p>`,
      },
      {
        title: 'Paglalagom', tone: 'red',
        html: `<h4>Simula</h4>
          <ol start="1"><li>Sino ang nakita ni Biboy sa tapat ng simbahan, at ano ang kanilang paninda?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Nakita ni Biboy si Ika at ang kanyang lola sa tapat ng simbahan. Ang kanilang paninda ay bulaklak, rosaryo, at iba pang dekorasyon na gawa sa papel.</p>
          <h4>Gitna</h4>
          <ol start="2"><li>Paano ginagamit ni Ika ang kanyang talento upang makatulong sa kanyang lola?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ginagamit ni Ika ang kanyang talento sa paggawa ng mga paninda upang makatulong sa kanyang lola.</p>
          <h4>Wakas</h4>
          <ol start="3"><li>Ano ang natutuhan ni Biboy tungkol sa kakayahan ng bawat tao?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Natutuhan ni Biboy na bawat tao ay may sariling kakayahan at dapat nating igalang at pahalagahan ang galing ng bawat isa.</p>
          <h4>Kabuuan</h4>
          <p>Habang papunta sa paaralan, nakita ni Biboy si Ika at ang kanyang lola sa tapat ng simbahan. Nalaman niyang si Ika ang gumagawa ng mga bulaklak na papel, rosaryo, at iba pang dekorasyon na kanilang binebenta. Kahit gumagamit siya ng wheelchair, hindi ito naging hadlang upang magamit niya ang kanyang talento at makatulong sa kanyang lola. Sa huli, nauunawaan ni Biboy na ang bawat tao ay may sariling kakayahan at dapat nating igalang at pahalagahan ang galing ng bawat isa.</p>`,
      },
      {
        title: 'Totoong Buhay', tone: 'blue',
        html: `<p class="question">May kaklase kang gumagamit ng hearing aid dahil mahina ang kaniyang pandinig. Hindi niya narinig ang sinabi ng guro.</p>
          <ul>
            <li>Tatawanan ko siya dahil hindi niya narinig.</li>
            <li>Hindi ko na lang muna siya kausapin.</li>
            <li class="is-answer">Ulitin ko nang maayos ang sinabi ng guro.</li>
          </ul>
          <p class="question">Narinig mong may batang sinasabihan ng “Hindi mo kaya iyan” dahil may kapansanan siya. Ano ang gagawin mo?</p>
          <ul>
            <li>Sumang-ayon at sabihing hindi niya talaga kaya.</li>
            <li class="is-answer">Sabihing kaya niya at suportahan siya.</li>
            <li>Pagtawanan siya dahil may kapansanan siya.</li>
          </ul>
          <p class="question">May batang may kapansanan na gustong sumali sa paligsahan, pero natatakot siyang matalo dahil iba siya sa iba.</p>
          <ul>
            <li class="is-answer">“Subukan mo! Ipagmalaki mo ang iyong talento!”</li>
            <li>“Huwag ka nang sumali dahil baka mapahiya ka pa.”</li>
            <li>“Manood ka na lang at suportahan ang iba.”</li>
          </ul>`,
      },
    ],
  },

  // Section 4679:1921, "Kuwento 3" (Gabay page 4679:2792)
  'ang-matapang-lumuluha-iyan': {
    thumb: 'thumb-ang-matapang-lumuluha-iyan.jpg',
    paksa: 'Pagpapahayag ng Damdamin at Pagiging Mahina',
    aral: 'Mahalaga ang pagpapahayag ng damdamin dahil hindi kahinaan ang pag-iyak.',
    salita: 97,
    vocab: [
      ['Hikbi', 'Putol-putol na paghinga habang umiiyak.'],
      ['Nadulas', 'Kawalan ng lakas o kakayahan sa isang bagay.'],
      ['Sugat', 'Hiwa, punit, o gasgas sa balat o katawan.'],
      ['Damdamin', 'Ang emosyon o nararamdaman ng isang tao.'],
      ['Nahiya', 'Nakaramdam ng pagkailang.'],
    ],

    // Figma 4679:2974 (panel 4679:3157)
    'bago-basahin': [
      {
        title: 'Misyon', tone: 'green',
        html: `<p>Alamin kung bakit mahalagang ipakita ang tunay na damdamin at ang pagpapakita ng emosyon ay hindi tanda ng kahinaan.</p>`,
      },
      {
        title: 'Layunin', tone: 'yellow',
        html: `<p>Sa pagtatapos ng aralin, inaasahang matutukoy ng mga mag-aaral:</p>
          <ul>
            <li>Ang mga damdamin ng mga tauhan sa kuwento.</li>
            <li>Ang aral ng kuwento na ang bawat isa ay may karapatang magpahayag ng kaniyang tunay na damdamin.</li>
            <li>Ang mga dahilan ng mga damdamin batay sa mga pangyayari sa kuwento.</li>
            <li>Ang pagkakasunod-sunod ng mahahalagang pangyayari mula simula, gitna, at wakas.</li>
          </ul>`,
      },
      {
        title: 'Hulaan', tone: 'red',
        html: `<p>Batay sa pamagat at larawan, tungkol saan kaya ang kwento?</p>
          <ul>
            <li>Isang batang ayaw maglaro dahil ayaw niyang matuto ng bisikleta.</li>
            <li class="is-answer">Isang batang nasaktan, nagpakita ng emosyon, at may natutunan pagiging matapang.</li>
            <li>Isang batang palaging umiiyak at hindi sumusubok gumawa ng bagay.</li>
          </ul>`,
      },
    ],

    // Figma 4679:3177 (panel 4679:3360)
    basahin: [
      {
        title: 'Ang Matapang, Lumuluha Iyan', tone: 'green',
        html: `<p>Masayang naglalaro ang mga bata sa kanto.</p>
          <p>May naghahabulan at nagbibisikleta.</p>
          <p>Nakikipag-unahan si Dos sa kaniyang kaibigan sa pagbibisikleta.</p>
          <p>Dahil sa sobrang bilis, nadulas siya at nasugatan ang tuhod.</p>
          <p>“Aray!” sigaw ni Dos habang umiiyak sa sakit.</p>
          <p>“Saan ang masakit, iho?” tanong ng matanda.</p>
          <p>Patuloy siya sa paghikbi ngunit may nagsabi, “Tigil mo iyan. Hindi umiiyak ang mga lalaki.”</p>
          <p>Malungkot na pinunasan ni Dos ang kaniyang mga luha at nahiya dahil sa mga nakapaligid.</p>
          <p>“Huwag mong pigilan ang nararamdaman mo,” sabi ni Lito.</p>
          <p>“Hindi ka dapat mahiya.”</p>
          <p><strong><em>Napangiti si Dos at nailabas ang tunay niyang damdamin.</em></strong></p>`,
      },
    ],

    // Figma 4679:3369 (panel 4679:3552)
    'pagkatapos-basahin': [
      {
        title: 'Tuklasin', tone: 'green',
        html: `<h4>Emosyon #1</h4>
          <ol start="1"><li>Naglalaro at nakikipag-unahan si Dos kasama ang kaniyang mga kaibigan.</li></ol>
          <p class="answer"><strong>SAGOT<br>Piliin ang “Natutuwa”<br>Natutuwa si Dos dahil naglalaro siya kasama ang kaniyang mga kaibigan.</strong></p>
          <h4>Emosyon #2</h4>
          <ol start="2"><li>Nadulas at nasugatan ni Dos ang kaniyang tuhod dahil sa sobrang bilis niyang mag bisikleta.</li></ol>
          <p class="answer"><strong>SAGOT<br>Piliin ang “Nasasaktan”<br>Nasasaktan si Dos dahil nadulas siya at nagkaroon ng sugat ang kaniyang tuhod.</strong></p>
          <h4>Emosyon #3</h4>
          <ol start="3"><li>Nasabihan si Dos ng isang lalaki na <em>“Tigil mo iyan. Hindi umiiyak ang mga lalaki.”</em></li></ol>
          <p class="answer"><strong>SAGOT<br>Piliin ang “Nahihiya”<br>Nahihiya si Dos dahil iniisip niyang hindi dapat umiiyak ang mga lalaki.</strong></p>
          <h4>Emosyon #4</h4>
          <ol start="4"><li>Nang makita ni Dos ang kanyang sugat, patuloy lang ang kanyang pag-iyak at hikbi hanggang sa hindi na siya makapag-salita.</li></ol>
          <p class="answer"><strong>SAGOT<br>Piliin ang “Nalulungkot”<br>Nalulungkot si Dos dahil nasugatan siya sa pagkadulas sa bisikleta.</strong></p>`,
      },
      {
        title: 'Suriin', tone: 'yellow',
        html: `<h4>Nasasaktan</h4>
          <ol start="1"><li>Bakit nasasaktan si Dos at napasabi ng “<em>Aray!</em>”?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Nasasaktan si Dos dahil nagkaroon siya ng sugat sa kaniyang tuhod.</p>
          <h4>Nalulungkot</h4>
          <ol start="2"><li>Bakit nalulungkot si Dos at patuloy ang kaniyang pag-iyak?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Nalulungkot si Dos dahil nadulas siya sa kaniyang bisikleta.</p>
          <h4>Nahihiya</h4>
          <ol start="3"><li>Bakit nahihiya si Dos at pinunasan bigla ang kaniyang mga luha?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Nahihiya si Dos dahil nasabihan siya na hindi dapat umiiyak ang mga lalaki.</p>
          <h4>Natutuwa</h4>
          <ol start="4"><li>Bakit natutuwa si Dos pagkatapos siyang kausapin ni Lito?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Natutuwa si Dos dahil pinayuhan siya ni Lito na ilabas ang kaniyang tunay na nararamdaman.</p>`,
      },
      {
        title: 'Paglalagom', tone: 'red',
        html: `<h4>Simula</h4>
          <ol start="1"><li>Ano ang nangyari kay Dos habang nagbibisikleta siya?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Nadulas si Dos dahil sa sobrang bilis ng pagbibisikleta at nasugatan ang kaniyang tuhod.</p>
          <h4>Gitna</h4>
          <ol start="2"><li>Ano ang sinabi ng lalaki kay Dos kaya nahiya siyang umiyak?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Sinabi ng lalaki na tumigil siya sa pag-iyak dahil hindi raw umiiyak ang mga lalaki.</p>
          <h4>Wakas</h4>
          <ol start="3"><li>Ano ang natutuhan ni Dos sa payo ni Lito tungkol sa damdamin?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Natutunan ni Dos na hindi siya dapat mahiya sa pagpapahayag ng tunay niyang damdamin at hindi kahinaan ang pag-iyak.</p>
          <h4>Kabuuan</h4>
          <p>Habang nagbibisikleta sina Dos at kaniyang kaibigan, nadulas si Dos at nagkaroon ng sugat sa tuhod. Umiyak siya dahil sa sakit, ngunit pinigilan niya ang kaniyang mga luha matapos sabihang hindi umiiyak ang mga lalaki. Nahiya si Dos at sinubukang itago ang kaniyang nararamdaman. Pinayuhan siya ni Lito na huwag pansinin ang mga nagsasabi nito at ilabas ang tunay niyang damdamin. Sa huli, natutunan ni Dos na hindi kahinaan ang pag-iyak at hindi dapat ikahiya ang pagpapahayag ng tunay na damdamin.</p>`,
      },
      {
        title: 'Totoong Buhay', tone: 'blue',
        html: `<p class="question">May nagsabi sa iyo na “Huwag kang umiyak, mahina ka.” Ano ang dapat mong isipin?</p>
          <ul>
            <li>Totoo iyon kaya dapat itago ang nararamdaman.</li>
            <li>Hindi ako dapat malungkot kailanman.</li>
            <li class="is-answer">Normal lang ang umiyak at magkaroon ng damdamin.</li>
          </ul>
          <p class="question">Nahihiya kang magsabi na ikaw ay nasaktan sa sinabi ng iyong kaibigan. Ano ang magandang gawin?</p>
          <ul>
            <li>Magtatanim nalang ako ng sama ng loob sa kanya.</li>
            <li class="is-answer">Sasabihin ko ang aking totoong nararamdaman.</li>
            <li>Hindi ko nalang papansinin ang aking kaibigan.</li>
          </ul>
          <p class="question">Nakita mong umiiyak nang malakas ang iyong kaibigan. Ano ang maaari mong gawin?</p>
          <ul>
            <li class="is-answer">Kukumustahin ko at sasamahan hanggang kumalma siya.</li>
            <li>Sasabihin ko na masyado siyang nag-iinarte.</li>
            <li>Tatawanan ko siya dahil umiiyak siya.</li>
          </ul>`,
      },
    ],
  },

  // Section 4728:3652, "Kuwento 4" (Gabay page 4728:4523)
  'ang-kendi-sa-sari-sari-store': {
    thumb: 'thumb-ang-kendi-sa-sari-sari-store.jpg',
    paksa: 'Pagtanggap sa Sariling Pagkakakilanlan at Pagkakaiba ng Bawat Isa',
    aral: 'Mahalagang maging totoo sa sarili at igalang ang pagkakakilanlan ng bawat isa.',
    salita: 257,
    vocab: [
      ['Mapabilang', 'Maging bahagi o tanggapin sa isang grupo.'],
      ['Mahinhin', 'Kumikilos o nagsasalita nang maayos.'],
      ['Pagmasdan', 'Tinitingnan o inoobserbahan nang mabuti ang isang bagay o tao.'],
      ['Garapon', 'Uri ng lalagyan na karaniwang gawa sa babasagin o plastik.'],
      ['Istante', 'Patungan ng mga bagay.'],
    ],

    // Figma 4728:4705 (panel 4728:4888)
    'bago-basahin': [
      {
        title: 'Misyon', tone: 'green',
        html: `<p>Alamin na bawat tao ay may sariling kakayahan at katangian, at tuklasin ang kahalagahan ng pagtanggap at pagmamahal sa sarili.</p>`,
      },
      {
        title: 'Layunin', tone: 'yellow',
        html: `<p>Sa pagtatapos ng aralin, inaasahang matutukoy ng mga mag-aaral:</p>
          <ul>
            <li>Ang emosyon ng mga tauhan sa iba’t ibang bahagi ng kuwento.</li>
            <li>Ang aral ng kuwento tungkol sa pagtanggap at pagmamahal sa sarili.</li>
            <li>Ang mga dahilan sa nararamdaman ng tauhan batay sa mga pangyayari.</li>
            <li>Ang pagkakasunod-sunod ng mahahalagang pangyayari mula simula, gitna, at wakas.</li>
          </ul>`,
      },
      {
        title: 'Hulaan', tone: 'red',
        html: `<p>Batay sa pamagat at larawan, tungkol saan kaya ang kwento?</p>
          <ul>
            <li>Isang bata na nawawala sa sari-sari store.</li>
            <li class="is-answer">Isang bata na natututo na tanggapin ang kanyang sarili.</li>
            <li>Isang bata nagnakaw ng kendi sa sari-sari store.</li>
          </ul>`,
      },
    ],

    // Figma 4728:4908 (panel 4728:5091)
    basahin: [
      {
        title: 'Ang Kendi sa Sari-Sari Store', tone: 'green',
        html: `<p>“Pabili poooo ng kendi!” masaya kong sabi habang itinuturo ang garapon sa istante.</p>
          <p>Inabot ko ang aking bayad at ibinigay naman ni Lola Nena ang napili kong kendi.</p>
          <p>Habang binubuksan ko ito, napansin kong nakatingin ang apo niyang si Carlo sa mga kendi.</p>
          <p>“Lola, may kwento po ako,” sabi ni Carlo.</p>
          <p>“Ano iyon, apo?” tanong ni Lola.</p>
          <p>Habang kumakain ako, nakinig ako sa kanilang usapan.</p>
          <p>“Nasa itaas ng istante ang mga chichirya,” simula ni Carlo.</p>
          <p>“Matapang at malakas. Lalaking-lalaki.”</p>
          <p>“Nasa kabilang istante naman ang mga tsokolate.”</p>
          <p>“Mahinhin at matamis magsalita. Babaeng-babae.”</p>
          <p>“At may isang kendi na sinubukang magbago.”</p>
          <p>“Pero kahit anong gawin niya, hindi siya mapabilang.”</p>
          <p>Yumuko si Carlo.</p>
          <p>“Kawawa naman ako..este…kawawa naman po ang kendi.”</p>
          <p>Kumuha si lola ng isang kendi mula sa istante at ipinakita ito kay Carlo.</p>
          <p>“Apo, wala ka naman ginagawang masama ah,” sabi niya.</p>
          <p>Kumunot ang noo ni Carlo.</p>
          <p>“Hindi ko po maintindihan.”</p>
          <p>“Kung wala po akong ginagawang masama, bakit parang ayaw po nila sa akin?”</p>
          <p>Ngumiti si Lola at itinuro ang mga paninda sa tindahan.</p>
          <p>“Lahat ng tao ay magkakaiba ngunit may lugar para sa lahat.”</p>
          <p>Napatingin si Carlo sa kanyang lola.</p>
          <p>“Pati po sa mga katulad ko?”</p>
          <p>“Oo naman apo,” sagot ni lola.</p>
          <p>“Hindi mo kailangan mapabilang dahil kailangan mo lang maging totoo sa sarili mo.”</p>
          <p>Unti-unting ngumiti si Carlo.</p>
          <p>“Walang mali sa pagiging ako.”</p>
          <p>Nginitian ko si Carlo at inalok siya ng kendi.</p>
          <p>Magkaiba man kami, pareho pa rin kaming mahalaga.</p>
          <p>Dahil ang bawat isa ay may sariling lugar sa mundo.</p>
          <p><strong><em>Tulad ng mga kendi sa sari-sari store.</em></strong></p>`,
      },
    ],

    // Figma 4728:5100 (panel 4728:5283)
    'pagkatapos-basahin': [
      {
        title: 'Tuklasin', tone: 'green',
        html: `<h4>Emosyon #1</h4>
          <ol start="1"><li>“May isang kendi na sinubukang magbago. Pero kahit ano gawin niya, hindi siya mapabilang.”</li></ol>
          <p class="answer"><strong>SAGOT:<br>Piliin ang “Malungkot”<br>Nalulungkot si Carlo dahil hindi niya kaya maging katulad ng iba.</strong></p>
          <h4>Emosyon #2</h4>
          <ol start="2"><li>Yumuko si Carlo, “Kawawa naman ako..este…kawawa naman po ang kendi.”</li></ol>
          <p class="answer"><strong>SAGOT:<br>Piliin ang “Malungkot”<br>Nalulungkot si Carlo dahil iniisip niya na kawawa siya.</strong></p>
          <h4>Emosyon #3</h4>
          <ol start="3"><li>Kumunot ang noo ni Carlo, “Hindi ko po maintindihan.”</li></ol>
          <p class="answer"><strong>SAGOT:<br>Piliin ang “Nalilito”<br>Nalilito si Carlo dahil hindi niya maintindihan ang sitwasyon niya.</strong></p>
          <h4>Emosyon #4</h4>
          <ol start="4"><li>“Kung wala po akong ginagawang masama, bakit parang may mali po sa akin?”</li></ol>
          <p class="answer"><strong>SAGOT:<br>Piliin ang “Nag-alala”<br>Nag-alala si Carlo dahil iniisip niya na baka may mali sa kanya.</strong></p>
          <h4>Emosyon #5</h4>
          <ol start="5"><li>Unti-unting ngumiti si Carlo, “Walang mali sa pagiging ako.”</li></ol>
          <p class="answer"><strong>SAGOT:<br>Piliin ang “Masaya”<br>Masaya si Carlo dahil naintindihan niya na walang mali sa kanya.</strong></p>`,
      },
      {
        title: 'Suriin', tone: 'yellow',
        html: `<h4>Damdamin #1</h4>
          <ol start="1"><li>Yumuko si Carlo at sinabi na kawawa naman siya.</li></ol>
          <p class="answer"><strong>SAGOT<br>Piliin ang “Mapait na damdamin”<br>Malungkot si Carlo dahil sa tingin niya ay nakaaawa ang sitwasyon niya.</strong></p>
          <h4>Damdamin #2</h4>
          <ol start="2"><li>Hindi maintindihan ni Carlo si Lola Nena kaya kumunot ang noo niya.</li></ol>
          <p class="answer"><strong>SAGOT<br>Piliin ang “Mapait na damdamin”<br>Nalilito si Carlo dahil nalilito siya sa mga pahayag ni Lola Nena.</strong></p>
          <h4>Damdamin #3</h4>
          <ol start="3"><li>Sinabi ni Lola na kailangan lang ni Carlo maging totoo sa sarili niya.</li></ol>
          <p class="answer"><strong>SAGOT<br>Piliin ang “Matamis na damdamin”<br>Masaya si Carlo nalaman niya na hindi niya kailangan magbago o mapabilang.</strong></p>
          <h4>Damdamin #4</h4>
          <ol start="4"><li>Sinabi ni Lola kay Carlo na wala naman siyang ginagawang masama.</li></ol>
          <p class="answer"><strong>SAGOT<br>Piliin ang “Matamis na damdamin”<br>Masaya si Carlo dahil nalaman niya na walang mali sa kanya.</strong></p>
          <h4>Damdamin #5</h4>
          <ol start="5"><li>Sinabi ni Carlo na kahit anong gawin niya, hindi siya mapabilang.</li></ol>
          <p class="answer"><strong>SAGOT<br>Piliin ang “Mapait na damdamin”<br>Malungkot si Carlo dahil pinipilit niyang maging katulad ng iba para mapabilang.</strong></p>`,
      },
      {
        // The frame's Paglalagom is Kuwento 1's text (Biboy and Popoy); kept as drawn until the frame is updated
        title: 'Paglalagom', tone: 'red',
        html: `<h4>Simula</h4>
          <ol start="1"><li>Ano ang unang nalaman ni Biboy tungkol sa pamilya ni Popoy na ikinagulat niya?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Nalaman ni Popoy na may dalawang mama si Biboy. Nagtaka siya dahil iba ito sa kaniyang inaasahang pamilya.</p>
          <h4>Gitna</h4>
          <ol start="2"><li><strong>Paano ipinaliwanag ni Popoy na pamilya pa rin ang may dalawang mama?</strong></li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ipinaliwanag ni Biboy na tulad din ng ibang pamilya, niyayakap, inaalagaan, tinutulungan, at mahal siya ng kaniyang dalawang mama.</p>
          <h4>Wakas</h4>
          <ol start="3"><li><strong>Ano ang natutuhan ni Biboy tungkol sa tunay na pamilya?</strong></li></ol>
          <p class="answer"><strong>SAGOT:</strong> Natutuhan ni Biboy na maaaring magkakaiba ang anyo ng pamilya. Ang tunay na pamilya ay may pagmamahal, pag-aalaga, at pagtanggap sa isa't isa.</p>
          <h4>Kabuuan</h4>
          <p>Nakita ni Biboy si Popoy habang naglalakad sa kanilang barangay. Nalaman niya na may dalawang mama si Popoy kaya siya ay nagtaka. Ikinuwento ni Popoy na siya ay minamahal, inaalagaan, at tinutulungan ng kanyang mga mama sa iba’t ibang pagkakataon. Habang nakikilala ni Biboy ang pamilya ni Popoy, nakita niya na ang pagmamahal at pag-aalaga ang mahalagang bahagi ng isang pamilya. Sa huli, natutunan ni Biboy na maaaring magkakaiba ang uri ng pamilya, ngunit ang bawat pamilya ay maaaring maging puno ng pagmamahal.</p>`,
      },
      {
        // The frame highlights “Gagayahin ko…” as the second answer; kept as drawn
        title: 'Totoong Buhay', tone: 'blue',
        html: `<p class="question">Mahilig kang gumuhit habang ang ibang kaklase mo ay mahilig maglaro ng sports. Sinabi nila na dapat gayahin mo sila.</p>
          <ul>
            <li>Itigil ang pagguhit para matanggap ng iba.</li>
            <li>Tatalikuran ko ang pagguhit at gagawin ko ang gusto nila.</li>
            <li class="is-answer">Ipagpapatuloy ko ang pagguhit dahil ito ang gusto ko.</li>
          </ul>
          <p class="question">Gusto mong magsuot ng damit o gamit na paborito mong kulay kahit iba ito sa ginagamit ng iyong mga kaibigan.</p>
          <ul>
            <li>Hindi ko na ito gagamitin para hindi matukso ng iba.</li>
            <li>Susuotin ko pa rin dahil ito ang magpapasaya sa akin.</li>
            <li class="is-answer">Gagayahin ko ang aking mga kaibigan para mapabilang.</li>
          </ul>
          <p class="question">Mas tahimik ka kaysa sa ibang bata. Mas gusto mong makinig, magbasa, o mag-isip muna bago magsalita.</p>
          <ul>
            <li class="is-answer">Tanggapin ko ang aking sarili dahil ito ang tunay na ako.</li>
            <li>Babaguhin ko agad ang aking sarili upang mapansin ng iba.</li>
            <li>Hahayaan ko na asarin nila ako dahil ito ang tunay na ako.</li>
          </ul>`,
      },
    ],
  },

  // Matiyaga St.: section 4793:8916, "Kuwento 1" (Gabay page 4801:1542)
  'ang-piraso-ng-biyaya': {
    thumb: 'thumb-ang-piraso-ng-biyaya.jpg',
    paksa: 'Pagpapahalaga sa Pagkain at Munting Biyaya',
    aral: 'Mahalagang pahalagahan ang biyaya dahil kahit ang maliliit na bagay ay may halaga.',
    salita: 104,
    vocab: [
      ['Panaderya', 'Lugar kung saan gumagawa at nagtitinda ng tinapay.'],
      ['Biyaya', 'Magandang bagay o tulong na binigay sa atin.'],
      ['Pinagpag', 'Inalis ang dumi sa isang bagay.'],
      ['Dismaya', 'Pakiramdam ng lungkot o inis dahil sa hindi inaasahang pangyayari.'],
      ['Piraso', 'Isang maliit na bahagi o parte ng isang buong bagay.'],
    ],

    // Figma 4801:1724 (panel 4801:1907)
    'bago-basahin': [
      {
        title: 'Misyon', tone: 'green',
        html: `<p>Alamin na ang mga bagay na tila maliit ay malaking biyaya sa iba, kaya mahalagang pahalagahan ang pagkain at huwag sayangin ito.</p>`,
      },
      {
        title: 'Layunin', tone: 'yellow',
        html: `<p>Sa pagtatapos ng aralin, inaasahang matutukoy ng mga mag-aaral:</p>
          <ul>
            <li>Ang mga pangyayari sa kuwento na nagpapakita ng sanhi at bunga.</li>
            <li>Ang aral ng kuwento tungkol sa pagpapahalaga sa pagkain at pag-iwas sa pag-aaksaya.</li>
            <li>Ang ugnayan ng sanhi at bunga sa mga kilos at desisyon ng mga tauhan.</li>
            <li>Ang pagkakasunod-sunod ng mahahalagang pangyayari mula simula, gitna, at wakas.</li>
          </ul>`,
      },
      {
        title: 'Hulaan', tone: 'red',
        html: `<p>Batay sa pamagat at larawan, tungkol saan kaya ang kwento?</p>
          <ul>
            <li>Isang batang nag-aksaya ng lahat ng pagkain.</li>
            <li class="is-answer">Natutunan ni Biboy pahalagahan ang isang maliit na piraso ng tinapay.</li>
            <li>Isang panadero na nagsara ng kaniyang panaderya dahil kay Biboy.</li>
          </ul>`,
      },
    ],

    // Figma 4801:1927 (panel 4801:2110)
    basahin: [
      {
        title: 'Ang Piraso ng Biyaya', tone: 'green',
        html: `<p>Sa tuwing papasok ako sa paaralan, naaamoy ko agad mula sa malayo ang matamis at mabangong bagong lutong tinapay sa panaderya.</p>
          <p>May dalawang bata ang nakaupo sa gilid nito.</p>
          <p>Tila nakatulala at naghihintay ng biyaya.</p>
          <p>“Gaano naman kaya katagal ang biyaya ngayong araw?” tanong ng isang bata.</p>
          <p>“Kuya, wala pa ba?” tanong niya muli.</p>
          <p>“Titignan ko kung ano magagawa ko” sagot ng kuya.</p>
          <p>“Gutom na ako.”</p>
          <p>Maya-maya, may batang bumili ng tinapay.</p>
          <p>Kinagatan niya ito.</p>
          <p>Ngunit, tinapon niya agad ito sa sahig.</p>
          <p>Napansin kong nalungkot ang maliit na bata.</p>
          <p>Ngunit ang Kuya ay biglang ngumiti.</p>
          <p>“Ito na ang biyayang hinihintay natin!”</p>
          <p>Mabilis niyang pinulot ang tinapay at pinagpag ito.</p>
          <p>Napaisip ako.</p>
          <p>Paano naging biyaya iyon?</p>
          <p>Akala ko kasi, hindi na mahalaga ang maliliit na piraso.</p>
          <p>Ang mga kaklase ko kasi, hindi inuubos ang baon nila at tinatapon na lamang.</p>
          <p>Pero para sa dalawang bata, binuo ng mga pirasong ito ang araw nila.</p>
          <p>“Oh, ito naman ang inumin. Biyaya ni Aling Martha.” sabi ng isa.</p>
          <p>Habang naglalakad ako, napatingin ako ulit sa mga piraso ng tinapay.</p>
          <p>Kanina, piraso lang ang tingin ko rito.</p>
          <p>Para pala sa iba, ang maliit na piraso ay mahalaga.</p>
          <p>At sa munting piraso ng biyaya,</p>
          <p><strong><em>May mga batang lumigaya.</em></strong></p>`,
      },
    ],

    // Figma 4801:2119 (panel 4801:2302)
    'pagkatapos-basahin': [
      {
        title: 'Tuklasin', tone: 'green',
        html: `<h4>Pangyayari #1</h4>
          <ol start="1"><li>May tinapay na nakita sa sahig.</li></ol>
          <p class="answer"><strong>SAGOT<br>Sanhi:</strong> Itinapon ito ng isang bata pagkatapos ito kagatin.<br><strong>Bunga:</strong> Mabilis na pinulot ni Kuya ang tinapay at pinagpag ito.</p>
          <h4>Pangyayari #2</h4>
          <ol start="2"><li>May dalawang batang naghihintay sa gilid ng panaderya.</li></ol>
          <p class="answer"><strong>SAGOT<br>Sanhi:</strong> Nagugutom na ang dalawa kaya naghihintay sila ng biyaya.<br><strong>Bunga:</strong> Nakatanggap sila ng biyaya na tinapay at inumin.</p>
          <h4>Pangyayari #3</h4>
          <ol start="3"><li>Nagbago ang pananaw ni Biboy tungkol sa piraso ng tinapay.</li></ol>
          <p class="answer"><strong>SAGOT<br>Sanhi:</strong> Nakita ni Biboy na mahalaga ang pagkain sa dalawang bata.<br><strong>Bunga:</strong> Napagtanto ni Biboy ang kahalagahan ng pagkain.</p>`,
      },
      {
        title: 'Suriin', tone: 'yellow',
        html: `<h4>Sanhi #1</h4>
          <ol start="1"><li>Ano ang sanhi ng paghihintay dalawang bata sa panaderya?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ang sanhi nito ay naghihintay sila ng pagkain o biyaya dahil sila ay nagugutom.</p>
          <h4>Sanhi #2</h4>
          <ol start="2"><li>Ano ang sanhi ng pagkatuwa ni Kuya nang makita ang tinapay?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ang sanhi nito ay itinuturing ni Kuya na biyaya ang tinapay.</p>
          <h4>Bunga #1</h4>
          <ol start="3"><li>Ano ang bunga ng pagkakita ni Kuya sa tinapay sa sahig?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ang bunga nito ay mabilis na pinulot at pinagpag ni Kuya ang tinapay upang makain nilang magkapatid.</p>
          <h4>Bunga #2</h4>
          <ol start="4"><li>Ano ang bunga ng pagkaunawa ni Biboy sa halaga ng tinapay?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ang bunga nito ay natutuhan ni Biboy na mahalaga ang bawat piraso ng pagkain.</p>`,
      },
      {
        title: 'Paglalagom', tone: 'red',
        html: `<h4>Simula</h4>
          <ol start="1"><li>Bakit naghihintay ang dalawang bata sa tabi ng panaderya?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Naghihintay ang dalawang bata ng biyaya dahil sila ay nagugutom.</p>
          <h4>Gitna</h4>
          <ol start="2"><li>Ano ang ginawa ni Kuya sa tinapay na itinapon sa sahig?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Pinulot at pinagpag ni Kuya ang tinapay na itinapon sa sahig upang makain nilang magkapatid.</p>
          <h4>Wakas</h4>
          <ol start="3"><li><strong>Ano ang natutuhan ni Biboy tungkol sa halaga ng bawat piraso ng tinapay?</strong></li></ol>
          <p class="answer"><strong>SAGOT:</strong> Natutuhan ni Biboy na mahalaga ang bawat piraso ng pagkain dahil biyaya ito.</p>
          <h4>Kabuuan</h4>
          <p>Habang papunta sa paaralan, nakita ni Biboy ang dalawang batang naghihintay ng biyaya sa tabi ng panaderya. Nang may batang magtapon ng tinapay sa sahig, pinulot at pinagpag ito ni Kuya upang makain nila. Binigyan din sila ni Aling Martha ng inumin. Natutuhan ni Biboy na mahalaga ang bawat piraso ng pagkain kaya hindi ito dapat sayangin.</p>`,
      },
      {
        title: 'Totoong Buhay', tone: 'blue',
        html: `<p class="question">Hindi mo nagustuhan ang ulam na niluto sa bahay dahil hindi ito ang paborito mo. Ano ang tamang gawin?</p>
          <ul>
            <li>Itatapon ko ang pagkain dahil hindi ko ito gusto.</li>
            <li>Hindi ko ito kakainin at hihingi nalang ako ng ibang ulam.</li>
            <li class="is-answer">Titikman ko muna dahil hindi lahat ay may makain.</li>
          </ul>
          <p class="question">Sinabi ng kaklase mo, “Kaunti lang naman ang natira, okay lang na hindi ko ubusin.” Ano ang dapat mong gawin?</p>
          <ul>
            <li>Hahayaan ko nalang siya na itapon niya ang pagkain.</li>
            <li class="is-answer">Sasabihin ko na huwag magsayang ng pagkain.</li>
            <li>Hindi ko siya papansinin dahil hindi ko naman pagkain iyon.</li>
          </ul>
          <p class="question">May kaklase kang nagugutom at walang baon dahil naiwan niya ito sa bahay. Ano ang gagawin mo?</p>
          <ul>
            <li class="is-answer">Magbabahagi ako ng pagkain kung mayroon akong sobra.</li>
            <li>Hindi ko siya papansinin dahil hindi ko problema iyon.</li>
            <li>Sasabihin kong huwag na lang niyang kalimutan sa susunod.</li>
          </ul>`,
      },
    ],
  },

  // Matiyaga St.: section 4801:2385, "Kuwento 2" (Gabay page 4801:3236)
  'ang-kaniyang-munting-ngiti': {
    thumb: 'thumb-ang-kaniyang-munting-ngiti.jpg',
    paksa: 'Pagiging Sensitibo sa Damdamin ng Kapwa',
    aral: 'Mahalagang isaalang-alang ang damdamin ng iba bago magbigay ng puna.',
    salita: 101,
    vocab: [
      ['Naglalako', 'Nagbebenta ng mga paninda habang naglalakad.'],
      ['Sorbetes', 'Matamis at malamig na pagkain.'],
      ['Natapilok', 'Nawala ang balanse habang naglalakad.'],
      ['Napagtanto', 'Naunawaan o nalaman pagkatapos mag-isip.'],
      ['Segundo', 'Yunit ng oras na mas maikli kaysa sa isang minuto.'],
    ],

    // Figma 4801:3419 (panel 4801:3602)
    'bago-basahin': [
      {
        title: 'Misyon', tone: 'green',
        html: `<p>Alamin na ang mga salita ay maaaring makasakit ng damdamin, kaya mahalagang mag-isip muna bago magsalita.</p>`,
      },
      {
        title: 'Layunin', tone: 'yellow',
        html: `<p>Sa pagtatapos ng aralin, inaasahang matutukoy ng mga mag-aaral:</p>
          <ul>
            <li>Ang mga pangyayari sa kuwento na nagpapakita ng sanhi.</li>
            <li>Ang mga pangyayari sa kuwento na nagpapakita ng bunga.</li>
            <li>Ang ugnayan ng sanhi at bunga sa mga kilos at desisyon ng mga tauhan.</li>
            <li>Ang pagkakasunod-sunod ng mahahalagang pangyayari mula simula, gitna, at wakas.</li>
          </ul>`,
      },
      {
        title: 'Hulaan', tone: 'red',
        html: `<p>Batay sa pamagat at larawan, tungkol saan kaya ang kwento?</p>
          <ul>
            <li>Isang bata na nagnakaw kay Mang Berto.</li>
            <li class="is-answer">Isang bata na natutong maging maingat sa kaniyang salita dahil kay Mang Berto.</li>
            <li>Isang bata na hindi na kumain ng sorbetes dahil kay Mang Berto.</li>
          </ul>`,
      },
    ],

    // Figma 4801:3628 (panel 4801:3811)
    basahin: [
      {
        title: 'Ang Kaniyang Munting Ngiti', tone: 'green',
        html: `<p>Habang naglalakad, narinig ko ang naglalako ng sorbetes.</p>
          <p>Tumakbo ako kay Mang Berto at bumili. Ngunit may napansin ako sa kaniyang ngiti.</p>
          <p>“Hahaha! Kulang ang ngipin!” sabi ko.</p>
          <p>Biglang nawala ang kaniyang ngiti.</p>
          <p>Kinuha ko ang sorbetes, ngunit natapilok ako at nadumihan.</p>
          <p>“Hahaha! Ang dumi!” sabi ng bata.</p>
          <p>Tinawag ako ni Mang Berto upang linisin.</p>
          <p>Habang ginagawa ito, nagbilang siya ng limang segundo.</p>
          <p>“Isa… dalawa… tatlo… apat… lima…”</p>
          <p>Nagbago ang itsura ko kaya sinubukan ko ito sa kaniya.</p>
          <p>Pero walang nagbago sa ngipin niya.</p>
          <p>Napagtanto kong hindi lahat ay kayang ayusin.</p>
          <p><strong><em>Humingi ako ng tawad, at bumalik ang kaniyang munting ngiti.</em></strong></p>`,
      },
    ],

    // Figma 4801:3826 (panel 4801:4009)
    'pagkatapos-basahin': [
      {
        title: 'Tuklasin', tone: 'green',
        html: `<h4>Pumili ng Bunga</h4>
          <ol start="1"><li>Pinagtawanan ni Biboy ang ngipin ni Mang Berto.</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Nawala ang ngiti ni Mang Berto dahil kay Biboy.</p>
          <ol start="2"><li>Natapilok si Biboy habang hawak niya ang kaniyang sorbetes.</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Natapon ang sorbetes kay Biboy at nadumihan siya.</p>
          <ol start="3"><li>Nagbilang si Biboy ng limang segundo habang nililinis siya ni Mang Berto.</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Walang nagbago sa ngipin ni Mang Berto.</p>
          <ol start="4"><li>Nagkamali si Biboy na pagtawanan si Mang Berto.</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Humingi siya ng tawad kay Mang Berto.</p>
          <ol start="5"><li>Humingi ng tawad si Biboy kay Mang Berto sa ginawa niyang mali.</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Bumalik na ang munting ngiti ni Mang Berto.</p>`,
      },
      {
        // The frame repeats item 3 as item 4; kept as drawn
        title: 'Suriin', tone: 'yellow',
        html: `<h4>Pumili ng Sanhi</h4>
          <ol start="1"><li>Nadumihan ang damit ni Biboy.</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ang sanhi nito ay natapilok siya habang may dalang sorbetes.</p>
          <ol start="2"><li>Nawala ang ngiti ni Mang Berto dahil kay Biboy.</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ang sanhi nito ay tinawanan ni Biboy ang kaniyang ngipin na kulang-kulang.</p>
          <ol start="3"><li>Naging maayos at malinis na ang itsura ni Biboy.</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ang sanhi nito ay tinawagan ni Mang Berto si Biboy upang malinisan siya.</p>
          <ol start="4"><li>Naging maayos at malinis na ang itsura ni Biboy.</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ang sanhi nito ay tinawagan ni Mang Berto si Biboy upang malinisan siya.</p>
          <ol start="5"><li>Bumalik ang munting ngiti ni Mang Berto dahil kay Biboy.</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ang sanhi nito ay humingi ng tawad si Biboy kay Mang Berto dahil napagtanto niya ang kaniyang pagkakamali.</p>`,
      },
      {
        title: 'Paglalagom', tone: 'red',
        html: `<h4>Simula</h4>
          <ol start="1"><li>Bakit pinagtawanan ni Biboy ang mga ngipin ni Mang Berto?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Tinawanan ni Biboy si Mang Berto dahil kulang-kulang ang kaniyang ngipin.</p>
          <h4>Gitna</h4>
          <ol start="2"><li>Ano ang nangyari kay Biboy at paano siya tinulungan ni Mang Berto?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Natapilok si Biboy at nadumihan ng sorbetes. Tinawag siya ni Mang Berto at tinulungang maglinis.</p>
          <h4>Wakas</h4>
          <ol start="3"><li><strong>Ano ang natutuhan ni Biboy tungkol sa pagsasalita sa kapwa?</strong></li></ol>
          <p class="answer"><strong>SAGOT:</strong> Mag-isip muna bago magsalita upang hindi makasakit ng damdamin ng iba.</p>
          <h4>Kabuuan</h4>
          <p>Bumili si Biboy ng sorbetes kay Mang Berto at pinagtawanan ang kaniyang ngipin. Natapilok si Biboy at nadumihan, kaya tinulungan siya ni Mang Berto. Napagtanto ni Biboy na hindi lahat ay kayang ayusin sa loob ng limang segundo. Humingi siya ng tawad, at muling bumalik ang ngiti ni Mang Berto. Natutuhan ni Biboy na mag-isip muna bago magsalita upang hindi makasakit ng damdamin ng iba.</p>`,
      },
      {
        title: 'Totoong Buhay', tone: 'blue',
        html: `<p class="question">May kaklase kang may kondisyon sa balat na hindi nakakahawa, ngunit iiwasan siya ng ibang bata.</p>
          <ul>
            <li>Iiwasan ko siya dahil kadiri siyang tignan.</li>
            <li>Papagtawanan ko siya dahil sa itsura ng balat niya.</li>
            <li class="is-answer">Magiging mabait ako dahil hindi naman mababago ang balat.</li>
          </ul>
          <p class="question">Napansin mong amoy pawis ang iyong kaklase. Ano ang dapat mong gawin para hindi siya masaktan?</p>
          <ul>
            <li>Iiwasan ko nalang siya dahil amoy pawis siya.</li>
            <li class="is-answer">Ibubulong ko sa kaniya nang maayos na amoy pawis siya.</li>
            <li>Sasabihin ko sa iba para sila na lang ang magsabi.</li>
          </ul>
          <p class="question">Napansin mong nakabukas ang zipper ng pantalon ng kaklase mo habang papasok kayo sa silid-aralan.</p>
          <ul>
            <li class="is-answer">Ibubulong ko sa kaniya nang maayos upang maisara niya ito.</li>
            <li>Tatawanan ko siya at sasabihin pa ito iba.</li>
            <li>Hahayaan ko nalang siya para mayroong iba na makapansin.</li>
          </ul>`,
      },
    ],
  },
};
