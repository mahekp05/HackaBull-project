import pandas as pd

# ------------------------------------
# Load Data
# ------------------------------------
benefits_df = pd.read_csv("benefits-and-cost-sharing-puf.csv", dtype=str, low_memory=False)
eligibility_df = pd.read_csv("medicaid-and-chip-eligibility-levels.xy8t-auhk.csv", dtype=str)

benefits_df.columns = benefits_df.columns.str.strip()
eligibility_df.columns = eligibility_df.columns.str.strip()
benefits_df['StandardComponentId'] = benefits_df['StandardComponentId'].str.strip()

# ------------------------------------
# User Input
# ------------------------------------
print("\nWelcome to Plan4You!\n")
name = input("👤 What is your name? ")
age = int(input("🎂 How old are you? "))
dependents = int(input("🏠 How many dependents live with you? "))
income = float(input("💰 What is your total annual household income (in USD)? "))
state = input("🏙️ What state do you live in? (e.g., FL): ").strip().upper()
wants_dental = input("🦷 Do you want dental coverage? (yes/no): ").strip().lower()

# ------------------------------------
# Household Calculations
# ------------------------------------
household_size = 1 + dependents
fpl_base = 14580
fpl_additional = 5140
fpl = fpl_base + (household_size - 1) * fpl_additional
fpl_percent = round((income / fpl) * 100, 1)

print(f"\n📊 {name}, your household size is {household_size} and your income is {fpl_percent}% of the Federal Poverty Level.\n")

# ------------------------------------
# Medicaid/CHIP Eligibility
# ------------------------------------
state_elig = eligibility_df[eligibility_df['State'].str.upper() == state]
is_medicaid_eligible = False
is_chip_eligible = False

if not state_elig.empty:
    row = state_elig.iloc[0]
    try:
        if age <= 1 and fpl_percent <= float(row['Medicaid Ages 0-1'].replace('%','').strip()):
            is_medicaid_eligible = True
        elif 1 < age <= 5 and fpl_percent <= float(row['Medicaid Ages 1-5'].replace('%','').strip()):
            is_medicaid_eligible = True
        elif 5 < age <= 18 and fpl_percent <= float(row['Medicaid Ages 6-18'].replace('%','').strip()):
            is_medicaid_eligible = True
        elif age <= 18 and fpl_percent <= float(row['Separate CHIP'].replace('%','').strip()):
            is_chip_eligible = True
    except Exception as e:
        print("Error during eligibility conversion:", e)
else:
    print("⚠️ Eligibility data not found for your state.")

if is_medicaid_eligible:
    print("✅ You may be eligible for Medicaid in your state.")
elif is_chip_eligible:
    print("✅ You may be eligible for CHIP (Children's Health Insurance Program).")
else:
    print("❌ You may not qualify for Medicaid or CHIP.")

# ------------------------------------
# Filter Plans
# ------------------------------------
state_filtered = benefits_df[benefits_df['StateCode'].str.upper() == state]

dental_benefits = [
    "Routine Dental Services (Adult)", "Dental Check-Up for Children", "Basic Dental Care - Child",
    "Orthodontia - Child", "Major Dental Care - Child", "Basic Dental Care - Adult",
    "Orthodontia - Adult", "Major Dental Care - Adult", "Accidental Dental"
]

if wants_dental == "yes":
    state_filtered = state_filtered[state_filtered['BenefitName'].isin(dental_benefits)]
else:
    state_filtered = state_filtered[~state_filtered['BenefitName'].isin(dental_benefits)]

if not (is_medicaid_eligible or is_chip_eligible):
    state_filtered = state_filtered[
        (state_filtered['IsCovered'].str.lower() == 'covered') &
        (
            state_filtered['CopayInnTier1'].notna() |
            state_filtered['CoinsInnTier1'].notna()
        )
    ]

# ------------------------------------
# Display Results
# ------------------------------------
plan_ids = state_filtered['StandardComponentId'].dropna().unique()
print(f"\n📦 Total matching plans: {len(plan_ids)}\n")

shown = 0
for pid in plan_ids:
    plan_data = state_filtered[state_filtered['StandardComponentId'] == pid]
    print(f"\n==============================\nPlan ID: {pid}")
    for _, row in plan_data.iterrows():
        print(f"- Benefit: {row['BenefitName']}")
        print(f"  Covered: {row['IsCovered']}")
        print(f"  Copay Tier 1: {row['CopayInnTier1']}")
        print(f"  Coinsurance Tier 1: {row['CoinsInnTier1']}\n")
    shown += 1

print(f"\n🎯 Total plans displayed: {shown}")
