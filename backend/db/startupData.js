const WalletModel = require('./../api/models/Wallet');
const UserModel = require('./../api/models/User');
const RoleModel = require('./../api/models/Role');
const TagModel = require('./../api/models/Tag');
const CategoryModel = require('./../api/models/Category');
const EmailModel = require('./../api/models/Email');
const CompanyModel = require('./../api/models/Company');
const SoldDataModel = require('./../api/models/SoldData');
const BoughtDataModel = require('./../api/models/BoughtData');
const { filter, includes } = require('lodash');

const { defaultImg } = require('./images');

const Sequelize = require('sequelize');

const initData = async () => {
    try {
        await loadRoles();
        await insertUser();
        const users = await UserModel.findAll();
        await loadWallet(users);
        await loadCategories();
        await loadTags();
        await loadSoldData(users);
        await loadBoughtData(users);
    } catch (err) {
        return err;
    }

}

const insertUser = async () => {
    await UserModel.bulkCreate([
        {
            username: 'MMarelix',
            googleId: '117299915804684678644',
            email: 'marelix2@gmail.com',
            avatar: 'https://lh3.googleusercontent.com/a-/AAuE7mAgdcWgQNBpEVVDsnNH4UO4gSJtBW-p6BiqnC3qsw?sz=50'
        },
        {
            username: 'Michał Rusinek',
            googleId: '104124918740810771973',
            email: 'ttcrudspotify@gmail.com',
            avatar: 'https://lh3.googleusercontent.com/a-/AAuE7mA4vldB4oskzoaXcRzCMDSLa2W3ZlOCCVNefqTi?sz=50'
        }
    ]
    ).then(async (users) => {
        const roles = await RoleModel.findAll();

        await users.map(async (user) => {
            await user.addRole(roles[0]);
        })

    })


}

const loadWallet = async (user) => {
    await WalletModel.create({
        name: 'portwel MMarelix',
        currentState: 0.00
    }).then(async (res) => {
        await res.setUser(user[0]);
    })

    await WalletModel.create({
        name: 'portwel Michal Rusinek',
        currentState: 0.00
    }).then(async (res) => {
        await res.setUser(user[1]);
    })
}

const loadRoles = async () => {
    await RoleModel.bulkCreate([
        { name: 'User' },
        { name: 'Admin' }
    ])
}

const loadCategories = async () => {
    await CategoryModel.bulkCreate([
        { name: 'Emails' },
        { name: 'Companies' }
    ])
}

const loadTags = async () => {
    let tags = await TagModel.bulkCreate(
        [
            {
                name: 'games',
                title: 'gry',
                img: defaultImg
            },
            {
                title: 'botanika',
                name: 'botany',
                img: defaultImg
            },
            {
                title: 'geografia',
                name: 'geography',
                img: defaultImg
            },
            {
                title: 'vege',
                name: 'vege',
                img: defaultImg
            },
            {
                title: 'religia',
                name: 'religion',
                img: defaultImg
            },
            {
                title: 'moda',
                name: 'fashion',
                img: defaultImg
            },
            {
                title: 'obuwie',
                name: 'boots',
                img: defaultImg
            },
            {
                title: 'zwierzeta',
                name: 'animals',
                img: defaultImg
            },
            {
                title: 'filmy',
                name: 'films',
                img: defaultImg
            },
            {
                title: 'programowanie',
                name: 'dev',
                img: defaultImg
            },
            {
                title: 'wyprzedaze',
                name: 'sales',
                img: defaultImg
            },
            {
                title: 'samorozwoj',
                name: 'selfDev',
                img: defaultImg
            }
        ]);

    let category = await CategoryModel.findOne({ where: { name: 'Emails' } });
    await tags.map((tag) => {
        tag.setCategory(category);
    })

    tags = await TagModel.bulkCreate(
        [
            {
                name: 'c_dev',
                title: 'oprogramowanie komputerowe',
                img: defaultImg
            },
            {
                title: 'spółdzienie mieszkaniowe',
                name: 'c_housing_association',
                img: defaultImg
            },
            {
                title: 'gastronomia',
                name: 'c_gastronomy',
                img: defaultImg
            }


        ]);

    category = await CategoryModel.findOne({ where: { name: 'Companies' } });
    await tags.map((tag) => {
        tag.setCategory(category);
    })
}

const loadSoldData = async (users) => {
    await SoldDataModel.create({
        name: 'init_data_emails'
    }).then(async (soldData) => {
        await users[0].addSoldData(soldData);
        await loadEmails(soldData);
    });

    await SoldDataModel.create({
        name: 'init_data_companies'
    }).then(async (soldData) => {
        await users[0].addSoldData(soldData);
        await loadCompanies(soldData);
    });
}

const loadEmails = async (soldData) => {
    const emails =
        await EmailModel.bulkCreate([
            { name: 'naoya@att.net' },
            { name: 'rande@yahoo.com' },
            { name: 'mallanmba@icloud.com' },
            { name: 'pakaste@icloud.com' },
            { name: 'gmcgath@att.net' },
            { name: 'preneel@msn.com' },
            { name: 'oechslin@hotmail.com' },
            { name: 'khris@verizon.net' },
            { name: 'dwendlan@mac.com' },
            { name: 'osrin@hotmail.com' },
            { name: 'shrapnull@hotmail.com' },
            { name: 'murty@optonline.net' },
            { name: 'sethbrown@sbcglobal.net' },
            { name: 'ullman@sbcglobal.net' },
            { name: 'scarlet@hotmail.com' },
            { name: 'nicktrig@gmail.com' },
            { name: 'kiddailey@sbcglobal.net' },
            { name: 'maneesh@gmail.com' },
            { name: 'plover@icloud.com' },
            { name: 'gregh@icloud.com' },
            { name: 'pappp@att.net' },
            { name: 'liedra@aol.com' },
            { name: 'dburrows@comcast.net' },
            { name: 'sriha@live.com' },
            { name: 'bmcmahon@icloud.com' },
            { name: 'dbrobins@icloud.com' },
            { name: 'cremonini@optonline.net' },
            { name: 'sravani@optonline.net' },
            { name: 'mwandel@msn.com' },
            { name: 'mchugh@att.net' },
            { name: 'wildixon@me.com' },
            { name: 'graham@att.net' },
            { name: 'kspiteri@att.net' },
            { name: 'sjmuir@outlook.com' },
            { name: 'dialworld@outlook.com' },
            { name: 'houle@icloud.com' },
            { name: 'geekoid@msn.com' },
            { name: 'kingjoshi@me.com' },
            { name: 'marcs@msn.com' },
            { name: 'rcwil@outlook.com' },
            { name: 'novanet@msn.com' },
            { name: 'dleconte@comcast.net' },
            { name: 'ryanshaw@yahoo.com' },
            { name: 'barnett@mac.com' },
            { name: 'sassen@yahoo.ca' },
            { name: 'rogerspl@mac.com' },
            { name: 'bmcmahon@hotmail.com' },
            { name: 'bmidd@live.com' },
            { name: 'makarow@msn.com' },
            { name: 'mkearl@comcast.net' },
            { name: 'gregh@aol.com' },
            { name: 'leviathan@hotmail.com' },
            { name: 'aprakash@mac.com' },
            { name: 'keiji@live.com' },
            { name: 'terjesa@gmail.com' },
            { name: 'fhirsch@sbcglobal.net' },
            { name: 'yzheng@outlook.com' },
            { name: 'cgcra@att.net' },
            { name: 'dbindel@hotmail.com' },
            { name: 'helger@live.com' },
            { name: 'petersko@yahoo.ca' },
            { name: 'bancboy@yahoo.com' },
            { name: 'vsprintf@msn.com' },
            { name: 'konst@live.com' },
            { name: 'bachmann@aol.com' },
            { name: 'miturria@att.net' },
            { name: 'kiddailey@icloud.com' },
            { name: 'zwood@outlook.com' },
            { name: 'fviegas@verizon.net' },
            { name: 'mfleming@yahoo.ca' },
            { name: 'lcheng@optonline.net' },
            { name: 'telbij@live.com' },
            { name: 'hahsler@outlook.com' },
            { name: 'tarreau@mac.com' },
            { name: 'kwilliams@att.net' },
            { name: 'killmenow@att.net' },
            { name: 'xtang@live.com' },
            { name: 'gavollink@verizon.net' },
            { name: 'iapetus@live.com' },
            { name: 'ozawa@outlook.com' },
            { name: 'godeke@mac.com' },
            { name: 'howler@att.net' },
            { name: 'parksh@me.com' },
            { name: 'wainwrig@gmail.com' },
            { name: 'yfreund@att.net' },
            { name: 'raines@yahoo.com' },
            { name: 'iapetus@sbcglobal.net' },
            { name: 'hedwig@yahoo.ca' },
            { name: 'bebing@yahoo.ca' },
            { name: 'flaviog@att.net' },
            { name: 'mgreen@icloud.com' },
            { name: 'mallanmba@mac.com' },
            { name: 'pspoole@att.net' },
            { name: 'osaru@msn.com' },
            { name: 'flaviog@outlook.com' },
            { name: 'fglock@hotmail.com' },
            { name: 'giafly@aol.com' },
            { name: 'parents@mac.com' },
            { name: 'papathan@mac.com' },
            { name: 'mleary@hotmail.com' },
            { name: 'bhtower@mac.com' },
            { name: 'boftx@sbcglobal.net' },
            { name: 'adhere@me.com' },
            { name: 'boftx@gmail.com' },
            { name: 'rbarreira@optonline.net' },
            { name: 'floxy@outlook.com' },
            { name: 'crowl@optonline.net' },
            { name: 'jigsaw@aol.com' },
            { name: 'wkrebs@hotmail.com' },
            { name: 'rande@optonline.net' },
            { name: 'phyruxus@aol.com' },
            { name: 'nweaver@verizon.net' },
            { name: 'hachi@live.com' },
            { name: 'choset@sbcglobal.net' },
            { name: 'dmath@att.net' },
            { name: 'ovprit@optonline.net' },
            { name: 'johnh@me.com' },
            { name: 'comdig@att.net' },
            { name: 'sthomas@me.com' },
            { name: 'metzzo@live.com' },
            { name: 'bowmanbs@icloud.com' },
            { name: 'bowmanbs@yahoo.ca' },
            { name: 'jschauma@yahoo.ca' },
            { name: 'william@yahoo.com' },
            { name: 'bahwi@comcast.net' },
            { name: 'salesgeek@icloud.com' },
            { name: 'mbswan@sbcglobal.net' },
            { name: 'retoh@att.net' },
            { name: 'dalamb@live.com' },
            { name: 'penna@mac.com' },
            { name: 'johndo@comcast.net' },
            { name: 'uncled@hotmail.com' },
            { name: 'keiji@optonline.net' },
            { name: 'mcnihil@yahoo.ca' },
            { name: 'jrifkin@hotmail.com' },
            { name: 'emcleod@sbcglobal.net' },
            { name: 'esasaki@icloud.com' },
            { name: 'barnett@sbcglobal.net' },
            { name: 'sbmrjbr@yahoo.ca' },
            { name: 'rupak@icloud.com' },
            { name: 'temmink@yahoo.com' },
            { name: 'kingjoshi@optonline.net' },
            { name: 'vertigo@verizon.net' },
            { name: 'munson@yahoo.ca' },
            { name: 'wilsonpm@yahoo.com' },
            { name: 'jpflip@yahoo.com' },
            { name: 'report@hotmail.com' },
            { name: 'wetter@mac.com' },
            { name: 'staikos@att.net' },
            { name: 'ebassi@outlook.com' },
            { name: 'lauronen@optonline.net' },
            { name: 'heckerman@gmail.com' },
            { name: 'seebs@gmail.com' },
            { name: 'eimear@optonline.net' },
            { name: 'forsberg@outlook.com' },
            { name: 'bester@me.com' },
            { name: 'ardagna@hotmail.com' },
            { name: 'hauma@hotmail.com' },
            { name: 'enintend@gmail.com' },
            { name: 'ozawa@msn.com' },
            { name: 'nweaver@msn.com' },
            { name: 'lishoy@gmail.com' },
            { name: 'syncnine@att.net' },
            { name: 'heroine@hotmail.com' },
            { name: 'odlyzko@aol.com' },
            { name: 'portele@msn.com' },
            { name: 'claypool@optonline.net' },
            { name: 'glenz@yahoo.com' },
            { name: 'weidai@yahoo.ca' },
            { name: 'horrocks@comcast.net' },
            { name: 'knorr@icloud.com' },
            { name: 'novanet@mac.com' },
            { name: 'chaki@sbcglobal.net' },
            { name: 'leakin@icloud.com' },
            { name: 'brbarret@hotmail.com' },
            { name: 'damian@att.net' },
            { name: 'osrin@verizon.net' },
            { name: 'nwiger@live.com' },
            { name: 'dgatwood@optonline.net' },
            { name: 'ribet@comcast.net' },
            { name: 'bmorrow@sbcglobal.net' },
            { name: 'payned@mac.com' },
            { name: 'mleary@att.net' },
            { name: 'mwandel@hotmail.com' },
            { name: 'mgreen@verizon.net' },
            { name: 'gordonjcp@optonline.net' },
            { name: 'rsteiner@me.com' },
            { name: 'kevinm@hotmail.com' },
            { name: 'saridder@aol.com' },
            { name: 'trieuvan@me.com' },
            { name: 'ngedmond@att.net' },
            { name: 'leakin@aol.com' },
            { name: 'barlow@hotmail.com' },
            { name: 'darin@optonline.net' },
            { name: 'tsuruta@sbcglobal.net' },
            { name: 'gboss@yahoo.ca' },
            { name: 'goresky@yahoo.ca' },
            { name: 'lridener@att.net' },
            { name: 'drezet@comcast.net' },
            { name: 'drezet@outlook.com' },
            { name: 'ccohen@att.net' },
            { name: 'plover@me.com' },
            { name: 'curly@mac.com' },
            { name: 'hstiles@att.net' },
            { name: 'nachbaur@att.net' },
            { name: 'melnik@icloud.com' },
            { name: 'dkrishna@hotmail.com' },
            { name: 'facet@att.net' },
            { name: 'sbmrjbr@hotmail.com' },
            { name: 'saridder@msn.com' },
            { name: 'shazow@verizon.net' },
            { name: 'pedwards@sbcglobal.net' },
            { name: 'jaxweb@outlook.com' },
            { name: 'denism@msn.com' },
            { name: 'bflong@yahoo.com' },
            { name: 'grothoff@me.com' },
            { name: 'singh@aol.com' },
            { name: 'alfred@aol.com' },
            { name: 'portscan@yahoo.com' },
            { name: 'vmalik@mac.com' },
            { name: 'attwood@msn.com' },
            { name: 'budinger@hotmail.com' },
            { name: 'danneng@aol.com' },
            { name: 'nogin@msn.com' },
            { name: 'kudra@hotmail.com' },
            { name: 'eminence@outlook.com' },
            { name: 'mcraigw@verizon.net' },
            { name: 'subir@live.com' },
            { name: 'farber@optonline.net' },
            { name: 'rogerspl@me.com' },
            { name: 'tskirvin@msn.com' },
            { name: 'keiji@outlook.com' },
            { name: 'chance@msn.com' },
            { name: 'heine@yahoo.ca' },
            { name: 'epeeist@outlook.com' },
            { name: 'nicktrig@verizon.net' },
            { name: 'kjohnson@gmail.com' },
            { name: 'kiddailey@hotmail.com' },
            { name: 'noneme@att.net' },
            { name: 'onestab@optonline.net' },
            { name: 'leocharre@icloud.com' },
            { name: 'chance@hotmail.com' },
            { name: 'gmcgath@msn.com' },
            { name: 'bonmots@comcast.net' },
            { name: 'eegsa@comcast.net' },
            { name: 'uqmcolyv@me.com' },
            { name: 'mbrown@comcast.net' },
            { name: 'msusa@comcast.net' },
            { name: 'fhirsch@mac.com' },
            { name: 'jeffcovey@optonline.net' },
            { name: 'andrewik@att.net' },
            { name: 'errxn@gmail.com' },
            { name: 'novanet@gmail.com' },
            { name: 'fmerges@me.com' },
            { name: 'mrsam@aol.com' },
            { name: 'rohitm@verizon.net' },
            { name: 'dkrishna@gmail.com' },
            { name: 'sscorpio@me.com' },
            { name: 'munson@me.com' },
            { name: 'penna@comcast.net' },
            { name: 'bockelboy@yahoo.ca' },
            { name: 'konst@hotmail.com' },
            { name: 'mugwump@aol.com' },
            { name: 'birddog@mac.com' },
            { name: 'osrin@optonline.net' },
            { name: 'eimear@sbcglobal.net' },
            { name: 'oevans@outlook.com' },
            { name: 'dimensio@me.com' },
            { name: 'mstrout@outlook.com' },
            { name: 'jmmuller@mac.com' },
            { name: 'miltchev@verizon.net' },
            { name: 'sjmuir@comcast.net' },
            { name: 'choset@att.net' },
            { name: 'lishoy@comcast.net' },
            { name: 'granboul@hotmail.com' },
            { name: 'portscan@optonline.net' },
            { name: 'dburrows@sbcglobal.net' },
            { name: 'ghaviv@yahoo.ca' },
            { name: 'phyruxus@msn.com' },
            { name: 'yzheng@comcast.net' },
            { name: 'munson@mac.com' },
            { name: 'liedra@yahoo.com' },
            { name: 'sethbrown@outlook.com' },
            { name: 'bancboy@verizon.net' },
            { name: 'mhoffman@icloud.com' },
            { name: 'mbrown@outlook.com' },
            { name: 'dcoppit@comcast.net' },
            { name: 'sethbrown@me.com' },
            { name: 'budinger@sbcglobal.net' },
            { name: 'samavati@icloud.com' },
            { name: 'oechslin@verizon.net' },
            { name: 'dogdude@hotmail.com' },
            { name: 'scarolan@me.com' },
            { name: 'frostman@aol.com' },
            { name: 'campware@optonline.net' },
            { name: 'muzzy@msn.com' },
            { name: 'arebenti@mac.com' },
            { name: 'ducasse@hotmail.com' },
            { name: 'damian@live.com' },
            { name: 'keiji@yahoo.com' }
        ]);

    const tags = await TagModel.findAll({ where: { fk_category: 1 } });
    emails.map(async (email) => {
        let randTags = Math.floor(Math.random() * tags.length - 1) + 1;
        await email.addTags(tags[randTags]);
        await soldData.addEmail(email);
    })
}

const loadCompanies = async (soldData) => {
    let companies = await CompanyModel.bulkCreate(
        [
            {
                name: "SoftHard S.A.",
                description: "Producent oprogramowania w Płocku",
                contactNumber: "24 262 25 72",
                locationCity: "Płock",
                address: "Graniczna 27",
                zipCode: "09-407",
                country: "Polska"
            },
            {
                name: "SoftHard S.A.",
                description: "Producent oprogramowania w Płocku",
                contactNumber: "54 411 55 50",
                locationCity: "Włocławek",
                address: "Jagiellońska 2",
                zipCode: "87-800",
                country: "Polska"
            },
            {
                name: "SoftHard S.A.",
                description: "Producent oprogramowania w Płocku",
                contactNumber: "22 822 13 69",
                locationCity: "Warszawa",
                address: "Opaczewska 69",
                zipCode: "02-201",
                country: "Polska"
            },
            {
                name: "SoftHard S.A.",
                description: "Producent oprogramowania w Płocku",
                contactNumber: "24 262 25 72",
                locationCity: "Wrocław",
                address: 'Sycowska 44',
                zipCode: "51-001",
                country: "Polska"
            },
            {
                name: "Bocianek. Spółdzielnia Mieszkaniowa",
                description: "Spółdzielnia mieszkaniowa",
                contactNumber: "41 332 24 41",
                locationCity: "Kielce",
                address: "Marii Konopnickiej 5",
                zipCode: "25-406",
                country: "Polska"
            },
            {
                name: "Spółdzielnia Mieszkaniowa. Administracja osiedla Kościuszki SMA",
                description: "Spółdzielnia mieszkaniowa",
                contactNumber: "41 344 96 31",
                locationCity: "Kielce",
                address: "Generała Tadeusza Kościuszki 50",
                zipCode: "25-326",
                country: "Polska"
            },
            {
                name: "Słoneczko.",
                description: " Osiedlowy Klub Kultury Kieleckiej Spółdzielni Mieszkaniowej",
                contactNumber: "41 341 66 80",
                locationCity: "Kielce",
                address: "Romualda 3",
                zipCode: "25-322",
                country: "Polska"
            },
            {
                name: "Setka Bar",
                description: "Kuchnia polska",
                contactNumber: "733 407 407",
                locationCity: "Wrocław",
                address: "Leszczyńskiego 4",
                zipCode: "50-077",
                country: "Polska",
                website: 'http://setkapolska.pl/'
            },
            {
                name: "Papa Bar",
                description: "Kuchnia polska",
                contactNumber: "71 341 04 85",
                locationCity: "Wrocław",
                address: "Rzeźnicza 32",
                zipCode: "50-130",
                country: "Polska",
                website: 'https://papabar.pl/'
            },
        ]
    )
    const tags = await TagModel.findAll({ where: { fk_category: 2 } });

    await companies.map(async (company, index) => {
        if (index < 4) {
            await company.addTags(tags[0]);
        } else if (index < 7) {
            await company.addTags(tags[1]);
        } else {
            await company.addTags(tags[2]);
        }
        await soldData.addCompany(company);
    })
}

const loadBoughtData = async (users) => {
    await BoughtDataModel.create({
        name: 'bought_exaple_1'
    }).then(async (boughtData) => {
        const category = await CategoryModel.findOne({ where: { name: 'Emails' } });
        await boughtData.setCategory(category);
        await users[0].addBoughtData(boughtData);
        await loadBoughtDataExampleFirst(boughtData);
    });

    await BoughtDataModel.create({
        name: 'bought_exaple_2'
    }).then(async (boughtData) => {
       const category = await CategoryModel.findOne({ where: { name: 'Companies' } });
        await boughtData.setCategory(category);
        
        await users[0].addBoughtData(boughtData);
        await loadBoughtDataExampleSecond(boughtData);
    });

    await BoughtDataModel.create({
        name: 'bought_exaple_3'
    }).then(async (boughtData) => {
        const category = await CategoryModel.findOne({ where: { name: 'Companies' } });
        await boughtData.setCategory(category);
        await users[0].addBoughtData(boughtData);
        await loadBoughtDataExampleThrind(boughtData);
    });

}

const loadBoughtDataExampleFirst = async (boughtData) => {
    let emails = await EmailModel.findAll({
        include: [
            { model: TagModel, required: true }
        ]
    });

    emails = filter(emails, (email) => {
        let tags = filter(email.Tags, (tag) => {
            return tag.id === 4 || tag.id === 7 || tag.id === 11
        });
        return tags.length !== 0
    });

    await emails.map(async (email) => await email.addBoughtData(boughtData));
}

const loadBoughtDataExampleSecond = async (boughtData) => {
    let companies = await CompanyModel.findAll({
        include: [
            { model: TagModel, required: true }
        ]
    });
    companies = filter(companies, (company) => {
        let tags = filter(company.Tags, (tag) => { return tag.id === 14});
        return tags.length !== 0;
    });

    await companies.map(async (company) => await company.addBoughtData(boughtData));
}

const loadBoughtDataExampleThrind = async (boughtData) => {
    let companies = await CompanyModel.findAll({
        include: [
            { model: TagModel, required: true }
        ]
    });
    companies = filter(companies, (company) => {
        let tags = filter(company.Tags, (tag) => { return tag.id === 15 });
        return tags.length !== 0;
    });

    await companies.map(async (company) => await company.addBoughtData(boughtData));
}


module.exports = {
    initData
}

initData();