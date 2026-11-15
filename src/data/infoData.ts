export type GuideStep = {
    title: string;
    text: string;
};

export type Guide = {
    id: string;
    platform: string;
    title: string;
    steps: GuideStep[];
};

export type Faq = {
    id: number;
    category: string;
    question: string;
    answer: string;
};

export type PolicySection = {
    heading: string;
    paragraphs: string[];
};

export type Policy = {
    id: string;
    title: string;
    updatedAt: string;
    summary: string;
    sections: PolicySection[];
};
