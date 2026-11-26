import { describe, it, expect } from 'vitest';
import { site, whatsappUrl, DEFAULT_WA_TEXT } from '../../src/lib/site';

describe('whatsappUrl', () => {
  it('uses the international number and encodes text', () => {
    const t = "Hi Simona! Party on 12/06 & 20 kids?";
    expect(whatsappUrl(t)).toBe('https://wa.me/447459889053?text=' + encodeURIComponent(t));
  });
  it('has a non-empty default message', () => {
    expect(DEFAULT_WA_TEXT.length).toBeGreaterThan(10);
    expect(whatsappUrl()).toContain(encodeURIComponent(DEFAULT_WA_TEXT));
  });
  it('site details match the Google profile', () => {
    expect(site.phoneDisplay).toBe('07459 889053');
    expect(site.phoneE164).toBe('447459889053');
  });
});
