# BrandingKilat ⚡

BrandingKilat is an AI-powered branding suite designed to help MSMEs (UMKM), startups, and professionals build and manage their brand identity instantly. By leveraging the power of Google's Gemini AI, BrandingKilat simplifies the complex process of branding into a conversational and interactive experience.

## 🚀 Key Features

*   **AI Brand Generator**: A chat-based interface (`gemini-2.5-flash`) that guides users through defining their brand name, industry, and target audience. It automatically generates brand logos using `gemini-2.5-flash-image`.
*   **Live Brand Preview**: Real-time visualization of the brand identity (logo, industry, colors) as it is being created alongside the chat.
*   **Advanced Brand Editor**: A comprehensive editor to fine-tune color palettes (Primary, Secondary, Accent), typography, and brand guidelines (Logo usage, Color system). Includes a mobile app mockup preview.
*   **Asset Library**: A centralized repository to manage, filter, and search for brand assets like logos, documents, and social media graphics.
*   **Dashboard**: A command center for quick actions, notifications, and managing integrations.
    *   **Quick Create**: Shortcuts for generating Social Posts, Business Cards, and Ad Campaigns.
*   **Integrations**:
    *   **WhatsApp Integration**: Connect a WhatsApp Business number to enable AI auto-replies.
    *   **P-IRT Regulation Assistant**: Specialized tool for checking food product regulation labels and generating QR codes.
*   **Plan Management**: Tiered access (Free vs. Pro) with different feature sets and credit limits.

## 💡 Use Cases

### 1. New Business Identity Creation
**Scenario:** A user wants to open a new coffee shop named "Kopi Kilat" but has no design skills.
**Workflow:**
1.  User logs in via WhatsApp or Email and selects the "F&B" business category.
2.  Enters "Kopi Kilat" in the Brand Generator chat.
3.  The AI suggests a target audience and generates a logo and color palette tailored to "Coffee Shop".
4.  User visualizes the brand instantly in the Live Preview panel.

### 2. Brand Refinement & Guidelines
**Scenario:** A business owner wants to change their brand color to Emerald Green and set usage rules.
**Workflow:**
1.  Navigate to the **Editor**.
2.  Use the Color Palette tools to switch to the "Emerald" preset or pick custom hex codes.
3.  Update the "Brand Guidelines" text area to specify that the logo must not be rotated.
4.  See the changes reflected immediately on the logo lockup and app mockup.

### 3. Quick Asset Generation
**Scenario:** A marketing team needs a social media post for a flash sale.
**Workflow:**
1.  Go to the **Dashboard**.
2.  Click on **Quick Create > Social Post** (or access via Sidebar Integrations > Quick Generator Tools).
3.  The system (mocked) generates an asset based on the current brand's style.

### 4. Regulatory Compliance (Indonesia)
**Scenario:** A home industry food business needs to ensure their packaging labels are P-IRT compliant.
**Workflow:**
1.  Access the **Asisten Regulasi P-IRT** from the sidebar.
2.  The tool assists in verifying label requirements and generating the necessary QR codes for the product packaging.

## 🛠️ Tech Stack

*   **Frontend**: React 19, React Router v7
*   **Styling**: Tailwind CSS
*   **AI Engine**: Google Gemini API (`@google/genai`)
*   **Icons**: Material Symbols Outlined

## 📦 Installation

1.  Clone the repository.
2.  Ensure you have a `metadata.json` and necessary environment variables for the API Key.
3.  Run the application in your development environment.

---
*BrandingKilat - Your AI Branding Partner*