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
};
