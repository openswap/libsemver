import SemVer from '../source/semver';
import 'mocha';
import {expect} from 'chai';

describe('SemVer', () => {
    let valid: Array<string>;
    let invalid: Array<string>;
    let parsedSemvers: Array<Object>;

    before(() => {
        valid = [
            '1.2.1-alpha1+githash',
            '2.3.1',
            '1.2.5+metadata',
            '2.0.0-beta',
            '3.1.8-rc',
            '1.2.11',
            '3.5.1',
            '5.2.1-alpha',
            '1.0.1-beta',
            '1.0.0-rc1',
            '57.2.11-beta',
            '2.1.6-alpha.beta.1',
            '6.2.3-rc1.5+somemetadata',
            '3.5.1+another_one',
        ];

        invalid = [
            '1.2.7-',
            '1.3.1+',
            '2.1.3-+',
            '1.4.5-.',
            '1.4.5-a.',
            '1.0',
            '1.2.4.5',
            '.1.3',
            '...',
            '...+rc',
            'a.1.2',
            '1.4.2abc',
            '1.6.2+',
            '1.4.5+a+b',
            '1.5.7-av-a',
        ];

        parsedSemvers = [
            {
                'major': 1,
                'minor': 2,
                'patch': 1,
                'alpha': true,
                'beta': false,
                'rc': false,
                'identifiers': ['alpha1'],
                'metadata': 'githash',
            },
            {
                'major': 2,
                'minor': 3,
                'patch': 1,
                'alpha': false,
                'beta': false,
                'rc': false,
            },
            {
                'major': 1,
                'minor': 2,
                'patch': 5,
                'alpha': false,
                'beta': false,
                'rc': false,
                'metadata': 'metadata',
            },
            {
                'major': 2,
                'minor': 0,
                'patch': 0,
                'alpha': false,
                'beta': true,
                'rc': false,
                'identifiers': ['beta'],
            },
            {
                'major': 3,
                'minor': 1,
                'patch': 8,
                'alpha': false,
                'beta': false,
                'rc': true,
                'identifiers': ['rc'],
            },
        ];
    });

    it('Should validate valid SemVers', () => {
        valid.forEach((semver) => {
            expect(SemVer.valid(semver)).to.deep.equal(true);
        });
    });

    it('Should invalidate invalid SemVers', () => {
        invalid.forEach((semver) => {
            expect(SemVer.valid(semver)).to.deep.equal(false);
        });
    });

    it('Should parse a valid SemVer', () => {
        for (let i = 0; i < parsedSemvers.length; i++) {
            const parsed: Object = SemVer.parse(valid[i]);
            expect(parsed).to.be.eql(parsedSemvers[i],
                JSON.stringify(parsed));
        }
    });

    it('Should fail to parse an invalid SemVer', () => {
        invalid.forEach((semver) => {
            expect(SemVer.parse(semver)).to.deep.equal(null);
        });
    });
});