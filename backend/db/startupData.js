const WalletModel = require('./../api/models/Wallet');
const UserModel = require('./../api/models/User');
const RoleModel = require('./../api/models/Role');
const TagModel = require('./../api/models/Tag');
const CategoryModel = require('./../api/models/Category');
const DescriptionModel = require('./../api/models/Description');
const EmailModel = require('./../api/models/Email');
const CompanyModel = require('./../api/models/Company');
const SoldDataModel = require('./../api/models/SoldData');
const BoughtDataModel = require('./../api/models/BoughtData');
const ProgressEmailModel = require('./../api/models/ProgressEmail');
const TagValueModel = require('./../api/models/TagValue');
const FeedbackModel = require('./../api/models/Feedback');
const { filter } = require('lodash');

const Mocks = require('./mocks');
const images = require('./images');

const Sequelize = require('sequelize');

const initData = async () => {
    try {
        await loadRoles();
        await insertUser();
        const users = await UserModel.findAll();
        await loadWallet(users);
        await loadComments(users);
        await loadCategories();
        await loadDescriptions();
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

const loadComments = async (user) => {
    const users = await UserModel.findAll();
    console.log(user[0]);
    await FeedbackModel.create({
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius, odio nec convallis dignissim, nulla leo hendrerit est, molestie pulvinar magna nulla non urna. Nulla suscipit ornare nisi vel laoreet. Morbi ut venenatis risus. Integer faucibus laoreet iaculis. '
    }).then(async (res) => {
        await user[0].addFeedback(res);
    })

    await FeedbackModel.create({
        description: 'Integer volutpat sem sapien, vel molestie nulla venenatis et. Integer vitae lobortis nibh, et lacinia eros. Phasellus molestie eros quis congue sagittis.'
    }).then(async (res) => {
        await user[0].addFeedback(res);
    })

    await FeedbackModel.create({
        description: 'Maecenas est erat, ultricies a fermentum ut, lacinia et est. Etiam at finibus purus, consectetur lacinia dui. Nullam vel placerat metus.'
    }).then(async (res) => {
        await user[0].addFeedback(res);
    })
}

const loadCategories = async () => {
    await CategoryModel.bulkCreate([
        { name: 'Emails' },
        { name: 'Companies' }
    ])
}

const loadDescriptions = async () => {
    await DescriptionModel.bulkCreate( 
        [
            {
                description: 'Kategoria ta skierowana jest do ludzi szukających rozrywki.'
            },
            {
                description: 'Ludzie interesujcy się ogrodnictwem.'
            },
            {
                description: 'Wszystko co związane z podróżami.'
            },
            {
                description: 'Zdrowy styl życia.'
            },
            {
                description: 'Religia.'
            },
            {
                description: 'Kategoria dla ludzi interesujących się nowymi trendami, lub szukających promocji.'
            },
            {
                description: 'Kategoria dla ludzi interesujących się butami.'
            },
            {
                description: 'Kategoria dla miłośników zwierząt.'
            },
            {
                description: 'Kategoria dla miłośników kinematografii i seriali.'
            },
            {
                description: 'Gałąź przeznaczona dla programistów.'
            },
            {
                description: 'Kategoria dla ludzi szukających okazji.'
            },
            {
                description: 'Kategoria dla ludzi chcących rozwijać swoje pasje.'
            },



            {
                description: 'Kategoria zawera inforamcje o firmach produkujących oprogramowanie komputerowe.'
            },
            {
                description: 'Kategoria zawera inforamcje o spółdzielniach mieszkaniowych.'
            },
            {
                description: 'Kategoria zawera inforamcje o firmach z branży gastronomicznej.'
            },
            {
                description: 'Kategoria zawera inforamcje o firmach z branży bankowość.'
            },
        ]
    )
}

const loadTags = async () => {
    let tags = await TagModel.bulkCreate(
        [
            {
                name: 'games',
                title: 'gry',
                img: images.gamesImg
            },
            {
                title: 'botanika',
                name: 'botany',
                img: images.natureImg
            },
            {
                title: 'geografia',
                name: 'geography',
                img: images.travelingImg
            },
            {
                title: 'vege',
                name: 'vege',
                img: images.vegeImg
            },
            {
                title: 'religia',
                name: 'religion',
                img: images.religionImg
            },
            {
                title: 'moda',
                name: 'fashion',
                img: images.fashionImg
            },
            {
                title: 'obuwie',
                name: 'boots',
                img: images.bootsImg
            },
            {
                title: 'zwierzeta',
                name: 'animals',
                img: images.animalsImg
            },
            {
                title: 'filmy',
                name: 'films',
                img: images.filmsImg
            },
            {
                title: 'programowanie',
                name: 'dev',
                img: images.programmingImg
            },
            {
                title: 'wyprzedaze',
                name: 'sales',
                img: images.defaultImg
            },
            {
                title: 'samorozwoj',
                name: 'selfDev',
                img: images.selfImprovementImg
            }
        ]);

    let category = await CategoryModel.findOne({ where: { name: 'Emails' } });
    let descriptions = await DescriptionModel.findAll();
    await tags.map(async (tag) => {
        const tagValue = await TagValueModel.create({value: 0.01});
        tag.setTagValue(tagValue);
      await  tag.setCategory(category);
        await tag.setDescription(descriptions[tag.id - 1]);
    })

    


    tags = await TagModel.bulkCreate(
        [
            {
                name: 'c_dev',
                title: 'oprogramowanie komputerowe',
                img: images.programingCopmanyImg
            },
            {
                title: 'spółdzienie mieszkaniowe',
                name: 'c_housing_association',
                img: images.houseImg
            },
            {
                title: 'gastronomia',
                name: 'c_gastronomy',
                img: images.gastronomyImg
            },
            {
                title: 'bankowość',
                name: 'c_banks',
                img: images.banksImg
            }
        ]);

    category = await CategoryModel.findOne({ where: { name: 'Companies' } });
    await tags.map(async (tag) => {
        const tagValue = await TagValueModel.create({ value: 0.01 });
        tag.setTagValue(tagValue);
      await  tag.setCategory(category);
      await  tag.setDescription(descriptions[tag.id-1]);
    })
}

const loadSoldData = async (users) => {
    await SoldDataModel.create({
        name: 'init_data_emails',
        status: 'completed'
    }).then(async (soldData) => {
        await users[0].addSoldData(soldData);
        await loadEmails(soldData);
    });

    await SoldDataModel.create({
        name: 'init_data_companies',
        status: 'completed'
    }).then(async (soldData) => {
        await users[0].addSoldData(soldData);
        await loadCompanies(soldData);
    });

    await SoldDataModel.create({
        name: 'progress_data_emails',
        status: 'progress'
    }).then(async (soldData) => {
        await users[0].addSoldData(soldData);
        await loadProgressEmails(soldData);
    });
}

const loadProgressEmails = async (soldData) => {
    const emails =
        await ProgressEmailModel.bulkCreate([
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
        await soldData.addProgressEmail(email);
    })
}

const loadEmails = async (soldData) => {
    const emails =
        await EmailModel.bulkCreate(Mocks.emails);

    const tags = await TagModel.findAll({ where: { fk_category: 1 } });
    emails.map(async (email) => {
        let randTags = Math.floor(Math.random() * tags.length - 1) + 1;
        await email.addTags(tags[randTags]);
        await soldData.addEmail(email);
    })
}

const loadCompanies = async (soldData) => {
    let companies = await CompanyModel.bulkCreate(Mocks.companies);

    const tags = await TagModel.findAll({ where: { fk_category: 2 } });

    await companies.map(async (company, index) => {
        if (index < 4) {
            await company.addTags(tags[0]);
        } else if (index < 7) {
            await company.addTags(tags[1]);
        } else if(index < 11){
            await company.addTags(tags[2]);
        }else {
            await company.addTags(tags[3]);
        }

        await soldData.addCompany(company);
    })
}


const loadBoughtData = async (users) => {
    await BoughtDataModel.create({
        name: 'bought_exaple_1',
        status:'completed'
    }).then(async (boughtData) => {
        const category = await CategoryModel.findOne({ where: { name: 'Emails' } });
        await boughtData.setCategory(category);
        await users[0].addBoughtData(boughtData);
        await loadBoughtDataExampleFirst(boughtData);
    });

    await BoughtDataModel.create({
        name: 'bought_exaple_2',
        status:'completed'
    }).then(async (boughtData) => {
       const category = await CategoryModel.findOne({ where: { name: 'Companies' } });
        await boughtData.setCategory(category);
        await users[0].addBoughtData(boughtData);
        await loadBoughtDataExampleSecond(boughtData);
    });

    await BoughtDataModel.create({
        name: 'bought_exaple_3',
        status:'completed'
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
            return tag.id === 4;
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